import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { createAPIKit } from "utils/APIKit";

export default async function auth(req, res) {
  let usernameCookie = req.cookies["username"];

  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],

    pages: {
      error: "/auth/error",
    },

    callbacks: {
      async signIn(params) {
        const { email } = params;
        const isNewUser = _checkIfNewUser(email);
        if (isNewUser) return false;
        else return true;
      },
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account?.provider === "google") {
          const { access_token } = account;

          // Check if user with email exists
          const isNewUser = await _checkIfNewUser(token?.email);
          let payload = {};
          let url = "";

          if (isNewUser) {
            // If new user, make request to sign up
            payload = { username: usernameCookie, access_token };
            url = "/auth/signup/google/";
          } else {
            // Else make request to sign in
            payload = { access_token };
            url = "/auth/login/google/";
          }

          // Using APIKit because /api/auth redirects to this file not handler
          const APIKit = await createAPIKit();
          try {
            const response = await APIKit.post(url, payload);
            if (response.status === 200) {
              const user = await response.data.payload;
              token = user;
            }
          } catch (e) {}
        }
        return token;
      },
      async session({ session, token }) {
        console.log(token);
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
          APIKit.defaults.headers.common[
            "Authorization"
          ] = `Token ${token_key}`;
        }
        try {
          await APIKit.get("/auth/logout/");
        } catch (e) {}
      },
    },
  });
}

const _checkIfNewUser = async (email) => {
  try {
    const APIKit = await createAPIKit();
    const res = await APIKit.post("/auth/check_email/", { email });
    if (res.status === 200) return true;
    else return false;
  } catch (e) {
    return false;
  }
};
