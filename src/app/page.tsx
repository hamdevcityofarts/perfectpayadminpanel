import { auth } from "@/auth";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default async function Home() {
  const user = await auth();

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
