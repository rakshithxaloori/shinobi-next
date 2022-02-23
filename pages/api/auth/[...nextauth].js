import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createAPIKit } from "utils/APIKit";
import { logOut } from "utils/auth";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("JWT", new Date());
      // Persist the OAuth access_token to the token right after signin
      if (account?.provider === "google") {
        const { access_token } = account;
        const APIKit = await createAPIKit();
        try {
          const response = await APIKit.post("/auth/login/google/", {
            access_token,
          });
          if (response.status === 200) {
            const user = await response.data.payload;
            token = user;
          }
        } catch (e) {
          console.log("JWT Error", e);
        }
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
      await logOut(token?.token_key);
    },
  },
});
