import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs";

interface IDashboardLayout {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({
  children,
  params,
}: IDashboardLayout) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // const billboard = prismadb.billboard.store.
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
