import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StaffModal from "@/Modal/StaffModals/StaffModal";
import StaffAccountTable from "@/components/tables/store-tables/staff-accounts-table/staff-account-table";
import StoreAddRoleModal from "@/modal/role-modal/store-role-modal/store-role-modal";

function StaffAccountV1() {
  return (
    <>
      <div>
        {/* Header title */}
        <div className="m-3">
          <h1 className="text-2xl font-semibold">Staff Accounts</h1>
          {/* <p className="text-sm">This is the Products page.</p> */}
        </div>

        {/* Stats */}

        {/* Staff modal */}
        <div className="text-end m-2">
          <StaffModal />
        </div>

        <div className="text-end m-2">
          <StoreAddRoleModal />
        </div>

        {/* Body content */}
        <div>
          <div>
            <Tabs defaultValue="all-staffs">
              <TabsList>
                <TabsTrigger value="all-staffs">All</TabsTrigger>
                <TabsTrigger value="deactivated">Deactivated</TabsTrigger>
              </TabsList>

              <TabsContent value="all-staffs">
                <div>
                  <div>
                    <StaffAccountTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="deactivated">
                <div>
                  <div>
                    <StaffAccountTable />
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

export default StaffAccountV1;
