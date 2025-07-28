import UserManagementTable from "@/components/tables/admin-tables/user-management-tables/user-management-table";
import { authClient } from "@/lib/auth-client";

function UserManagements() {
  return (
    <>
      <div>
        {/* Title section */}
        <div className="m-3 text-xl font-semibold font-notoserif">
          <h1>User Management</h1>
        </div>

        <div>
          <UserManagementTable />
        </div>
      </div>
    </>
  );
}

export default UserManagements;
