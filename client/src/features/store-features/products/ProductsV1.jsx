import AddProductModal from "@/Modal/Product/ProductModal";
import ProductCategoryTable from "@/components/tables/store-tables/products-table/product-category-table";
import ProductTable from "@/components/tables/store-tables/products-table/products-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function ProductsV1() {
  return (
    <>
      <div>
        {/* Header title */}
        <div className="m-3">
          <h1 className="text-2xl font-semibold">Products</h1>
          {/* <p className="text-sm">This is the Products page.</p> */}
        </div>

        {/* Stat */}
        <div></div>

        {/* Body */}
        <div>
          <div></div>
          <div>
            <Tabs defaultValue="products" className="m-2">
              <TabsList className="">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="category">Category</TabsTrigger>
                <TabsTrigger value="featured-brands">
                  Featured Brands
                </TabsTrigger>
              </TabsList>
              <TabsContent value="products">
                <div>
                  <div className="m-2 flex flex-row gap-2 justify-end">
                    <AddProductModal />
                  </div>
                  <div>
                    <ProductTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="category">
                <div>
                  <div>
                    <Button>Featured</Button>
                  </div>
                  <div>
                    <ProductCategoryTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="featured-brands">
                <div>
                  <div>
                    <Button></Button>
                  </div>
                  <div></div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsV1;
