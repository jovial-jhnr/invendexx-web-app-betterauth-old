import OrderTable from "@/components/tables/store-tables/orders-table/order-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrderStoreStats from "@/dashboard-stats/store-dashstats/order-store-stats";

function OrderOverviewV1() {
  return (
    <>
      <div>
        {/* Header title */}
        <div className="m-3">
          <h1 className="text-2xl font-semibold">Order Overview </h1>
        </div>

        <div className="m-2">
          <OrderStoreStats />
        </div>

        {/* Body */}
        <div>
          <div>
            <OrderTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderOverviewV1;
