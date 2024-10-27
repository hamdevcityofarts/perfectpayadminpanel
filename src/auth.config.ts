import type { NextAuthConfig } from 'next-auth';
import { setAuthToken } from './tokenStore'; // Importation du gestionnaire de token
import { refreshToken } from './services';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/authentication',
  },
  
 
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },

  providers: [
    // Liste des providers (ex: Credentials, OAuth, etc.)
  ],
};
