import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { createAPIKit } from "utils/APIKit";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account?.provider === "google") {
        const { access_token } = account;

        // Using APIKit because /api/auth redirects to this file not handler
        const APIKit = await createAPIKit();
        try {
          const response = await APIKit.post("/auth/login/google/", {
            access_token,
          });
          if (response.status === 200) {
            const user = await response.data.payload;
            token = user;
          }
        } catch (e) {}
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session = { ...token };
      return session;
    },
  },

  events: {
    async signOut({ token }) {
      const token_key = token?.token_key;

      // Using APIKit because /api/auth redirects to this file not handler
      const APIKit = await createAPIKit();
      if (token_key) {
        APIKit.defaults.headers.common["Authorization"] = `Token ${token_key}`;
      }
      try {
        await APIKit.get("/auth/logout/");
      } catch (e) {}
    },
  },
});
