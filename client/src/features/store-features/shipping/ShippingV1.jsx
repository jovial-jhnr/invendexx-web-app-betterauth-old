import ShippingTable from "@/components/tables/store-tables/shipping-tables/shipping-table";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

function ShippingV1() {
  return (
    <>
      <div>
        {/* Header title */}
        <div>
          <h1 className="m-3 text-xl font-semibold"> Shipping Method </h1>
        </div>

        {/* Body content */}
        <div>
          <div>
            <Tabs defaultValue="shipping">
              <TabsList className="text-lg">
                <TabsTrigger className="text-sm" value="shipping">
                  Shipping Details
                </TabsTrigger>
                <TabsTrigger className="text-sm" value="integration">
                  Shipping Integratiom
                </TabsTrigger>
              </TabsList>

              {/* Content body */}
              <TabsContent value="shipping">
                <div>
                  <p>This side is ratings</p>

                  <div className="m-2">
                    <ShippingTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="integration">
                <div>
                  <p>Comming Soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingV1;
