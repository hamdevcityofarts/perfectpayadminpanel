import type { NextAuthConfig } from "next-auth";

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
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          phone_number: token.phone_number,
          language: token.language,
        },
      };
    },
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    // Liste des providers (ex: Credentials, OAuth, etc.)
  ],
};
