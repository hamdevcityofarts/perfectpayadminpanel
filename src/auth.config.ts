import type { NextAuthConfig } from "next-auth";
// https://www.youtube.com/watch?v=95fuP8jpWlk

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/authentication",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) {
        const u = user as unknown as any;

        return {
          ...token,
          id: u.id,
          phone_number: u.phone_number,
          language: u.language,
          accessToken: u.accessToken,
          refreshToken: u.refreshToken,
        };
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            phone_number: token.phone_number,
            language: token.language,
            accessToken: token.accessToken,
          },
        };
      }
      return session;
    },
  },

  providers: [
    // Liste des providers (ex: Credentials, OAuth, etc.)
  ],
};
