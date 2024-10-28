// fichier d'authentification (par exemple, auth.ts)
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getUserConnect } from "./services"; // Import de la fonction getUser

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          const user = await getUserConnect(
            credentials?.phone as string,
            credentials?.pin as string,
          );

          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
});
