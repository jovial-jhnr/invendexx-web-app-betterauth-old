import UserManagementsV1 from "@/features/admin-features/user-management/User-MangementV1";
import { authClient } from "@/lib/auth-client";

function UserManagements() {
  return (
    <>
      <div>
        <UserManagementsV1 />
      </div>
    </>
  );
}

export default UserManagements;
