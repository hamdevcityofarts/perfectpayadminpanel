"use client";

import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableTwo from "@/components/Tables/Login";
import React from "react";


export default function Home() {

  
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <div>Loading...</div>;  // Montre un écran de chargement pendant que la session est vérifiée
  // }

  // if (status === "unauthenticated") {
  //   return <TableTwo />;  // Redirige vers le formulaire de login si l'utilisateur n'est pas authentifié
  // }
 
  // Si l'utilisateur est authentifié, affiche la page avec le layout
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
