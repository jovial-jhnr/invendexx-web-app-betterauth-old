import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import backendUrl from "@/lib/backendUrl";
import Spinner from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

// Fetching the user (old)
// const fetchUser = async () => {
//   try {
//     const response = await backendUrl.get("/api/auth/session", {
//       withCredentials: true, // Ensures cookies are sent
//     });
//     return response.data.user;
//   } catch (error) {
//     console.error("User fetch error:", error);
//     return null;
//   }
// };

const ProtectedRoute = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
}) => {
  // Uer from useSession(old)
  // const {
  //   data: user,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["session"],
  //   queryFn: fetchUser,
  //   retry: false,
  // });

  // Getting user from authClient (new)
  const { data: session, error } = authClient.useSession();

  const user = session?.user;

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-20 h-20" />
      </div>
    );
  if (error)
    return (
      <p className="flex items-center justify-center min-h-screen">
        Error fetching session. Please try again later.
      </p>
    );

  // Check if the user is authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role-based access check (only check roles for `admin` or `store_owner` if provided)
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/error-404" />;
  }

  // Skip permission check for admins and store owners
  if (["admin", "owner"].includes(user.role)) {
    return children;
  }

  // Check permission-based access (only for staff or other roles)
  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every((perm) => user.permissions.includes(perm))
  ) {
    return <Navigate to="/error-404" />;
  }

  // const storeAccess = user?.stores?.[0]?.hasAccess;

  // If hasAccess is required for the route, check it
  if (storeAccess === "true") {
    return children;
  }

  // If the user doesn't have store access
  if (requiredAccess.length > 0) {
    if (
      !store ||
      !requiredAccess.includes(storeAccess === true || storeAccess === "true")
    ) {
      return <Navigate to="/error-404" />;
    }
  }

  // If the user passes the checks, render the children (protected route content)
  return children;
};

export default ProtectedRoute;
