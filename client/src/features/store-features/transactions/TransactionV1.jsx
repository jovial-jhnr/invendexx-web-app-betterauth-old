import { StatCard } from "@/components/DashFeature/StoreFeatures/storeCharts/StatCard";
import SettlementTable from "@/components/tables/store-tables/transactions-table/settlements-table";
import TransactionTable from "@/components/tables/store-tables/transactions-table/transaction-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TransactionV1() {
  return (
    <>
      <div>
        {/* Header containing the title */}
        <div className="m-3">
          <h1 className=" text-2xl font-semibold font-inter">Transactions</h1>
          <p>This is the Transactions page.</p>
        </div>

        {/* Transaction Stats here */}
        <div className="m-2 p-2">
          <StatCard />
        </div>

        {/* Body content  */}
        <div>
          <div>
            <Tabs defaultValue="transactions">
              <TabsList>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="settlements">Settlements</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions">
                <div>
                  <div>
                    <Button>Tans Button</Button>
                  </div>
                  <div>
                    <TransactionTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settlements">
                <div>
                  <div>
                    <Button>Settle Button</Button>
                  </div>
                  <div>
                    <SettlementTable />
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

export default TransactionV1;
