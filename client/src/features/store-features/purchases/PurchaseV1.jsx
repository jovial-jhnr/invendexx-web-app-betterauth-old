import React from "react";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import PurchaseTable from "@/components/tables/store-tables/purchase-table/purchase-table";
import SupplierTable from "@/components/tables/store-tables/purchase-table/supplier-table";

function PurchaseV1() {
  return (
    <>
      <div>
        {/* Header title */}
        <div>
          <h1 className="m-3 text-xl font-semibold"> Purchase and Supply</h1>
        </div>

        {/* Body content */}
        <div>
          <div>
            <Tabs defaultValue="ratings">
              <TabsList className="text-lg">
                <TabsTrigger className="text-sm" value="purchase">
                  Purchase
                </TabsTrigger>
                <TabsTrigger className="text-sm" value="supply">
                  Supply
                </TabsTrigger>
              </TabsList>

              {/* Content body */}
              <TabsContent value="purchase">
                <div>
                  <div>
                    <PurchaseTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="supply">
                <div>
                  <div>
                    <SupplierTable />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchaseV1;
