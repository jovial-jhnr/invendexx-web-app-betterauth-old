import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrderStoreStats from "@/dashboard-stats/store-dashstats/order-store-stats";

function OrdersV1() {
  return (
    <>
      <div>
        {/* Header title */}
        <div className="m-3">
          <h1 className="text-2xl font-semibold">Orders</h1>
        </div>
        {/* Body */}
        <div>
          <div className="m-2">
            <OrderStoreStats />
          </div>
          <div>
            <Tabs defaultValue="order">
              <TabsList>
                <TabsTrigger value="order">Order </TabsTrigger>
                <TabsTrigger value="waiting">Waiting</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              </TabsList>
              <TabsContent value="order">
                <div>
                  <div>
                    <Button></Button>
                  </div>
                  <div></div>
                </div>
              </TabsContent>

              <TabsContent value="">
                <div>
                  <div>
                    <Button></Button>
                  </div>
                  <div></div>
                </div>
              </TabsContent>

              <TabsContent value="">
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

export default OrdersV1;
