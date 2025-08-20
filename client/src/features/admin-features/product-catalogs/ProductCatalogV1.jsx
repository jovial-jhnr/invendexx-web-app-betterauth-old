import BusinessManagementTable from "@/components/tables/admin-tables/business-management/business-management-table";
import ProductCatalogTable from "@/components/tables/admin-tables/product-catalog-tables/product-catalog-table";
import ProductTable from "@/components/tables/store-tables/products-table/products-table";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

export default function ProductCatalogV1() {
  return (
    <>
      <div>
        {/* Title heading */}
        <div className="m-3">
          <h1 className="text-xl font-semibold">Product Catalog</h1>
        </div>

        <div></div>

        {/* Body */}
        <div>
          <div classname="Tabs content">
            <Tabs defaultValue="product-catalog">
              <TabsList>
                <TabsTrigger value="product-catalog">
                  Product Catalogs
                </TabsTrigger>
                <TabsTrigger value="product-category">
                  Product Category
                </TabsTrigger>
                <TabsTrigger value="featured-brands">
                  Featured Brands
                </TabsTrigger>
              </TabsList>

              {/* Tab Contents */}
              <TabsContent value="product-catalog">
                <div>
                  <ProductCatalogTable />
                </div>
              </TabsContent>
              <TabsContent value="product-category">
                <div>
                  <ProductTable />
                </div>
              </TabsContent>
              <TabsContent value="featured-brands">
                <div>
                  <BusinessManagementTable />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
