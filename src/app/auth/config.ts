import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "Your phone number" },
        pin: { label: "PIN", type: "password" }
      },
      async authorize(credentials) {
        try {
          const { phone, pin } = credentials;

          // Appel à l'API de votre backend pour l'authentification
          const response = await axios.post("https://votre-api.com/login", {
            phone: phone,
            pin: pin,
          });

          const user = response.data;

          // Vérifiez si la réponse API contient un utilisateur valide
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error in authentication:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Page de connexion personnalisée
  },
  secret: process.env.NEXTAUTH_SECRET,  // Utilisez votre secret généré ici
  session: {
    strategy: "jwt", // Utilisation de JSON Web Tokens
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.phone = token.phone;
      return session;
    },
  },
});
