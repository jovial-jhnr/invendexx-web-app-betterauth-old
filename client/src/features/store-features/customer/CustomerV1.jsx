import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CustomerTable from "@/components/tables/store-tables/customer-table/customer-table";

function CustomerV1() {
  return (
    <>
      <div>
        {/* Header title */}
        <div className="m-3">
          <h1 className=" text-2xl font-semibold font-inter">Customers</h1>
          <p className="text-sm">Manage your customers here.</p>
        </div>

        {/* Body Content */}
        <div>
          <div>
            <Tabs defaultValue="customers">
              <TabsList>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="customer-groups">
                  Customer Groups
                </TabsTrigger>
                <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
              </TabsList>

              <TabsContent value="customers">
                <div>
                  <div>
                    <Button>Customers</Button>
                  </div>
                  <div>
                    <CustomerTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="customer-groups">
                <div>
                  <div>
                    <Button></Button>
                  </div>
                  <div>
                    <CustomerTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="newsletter">
                <div>
                  <div>
                    <Button></Button>
                  </div>
                  <div>
                    <CustomerTable />
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

export default CustomerV1;
