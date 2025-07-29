import UserManagementTable from "@/components/tables/admin-tables/user-management-tables/user-management-table";
import { Button } from "@/components/ui/button";

function UserManagementsV1() {
  return (
    <>
      <div>
        {/* Title section */}
        <div className="m-3 text-xl font-semibold ">
          <h1>User Management</h1>
        </div>

        <div className="text-end mx-2">
          <Button>Button</Button>
        </div>
        <div className="m-3">
          <UserManagementTable />
        </div>
      </div>
    </>
  );
}

export default UserManagementsV1;
