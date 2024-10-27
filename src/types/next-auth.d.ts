// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Remplacez `string` par le type correct si nécessaire
    token: string; // Remplacez `string` par le type correct si nécessaire
  }

  interface Session {
    user: User; // Assurez-vous que `user` contient les propriétés étendues
  }
}
