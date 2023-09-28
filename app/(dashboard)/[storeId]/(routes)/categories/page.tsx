import prismadb from "@/lib/prismadb";
import CategoriesClient from "./components/client";
import { Billboard } from "@prisma/client";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";

interface BillboardsPageProps {
  data: Billboard;
}

const CategoriesPage  = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;