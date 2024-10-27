// fichier d'authentification (par exemple, auth.ts)
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { getUserConnect } from './services'; // Import de la fonction getUser

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials) {
          // Appel de la fonction getUser pour authentifier l'utilisateur
          const user = await getUserConnect(credentials.phone as string, credentials.pin as string);

          if (user) {
            return user; // Retourne l'utilisateur s'il est trouvé
          }

          throw new Error('Invalid credentials'); // Si l'utilisateur n'est pas trouvé
        }
        return null;
      },
    }),
  ],
});
