import { getCategories } from "@/lib/api";
import ShopSidebarClient from "./ShopSidebarClient";


export default async function ShopSidebar({filters, setFilters}) {
      const categories = await getCategories();

  return (

    <ShopSidebarClient categories={categories}  filters={filters}
      setFilters={setFilters}/>
    
  );
}