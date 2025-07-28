// authMiddleware.js
import { fromNodeHeaders } from "better-auth/node";

export async function currentSession(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    console.log("Back Session", session);
    res.locals.session = session;
    next();
  } catch (err) {
    console.error("Session error:", err);
    res.locals.session = null;
    next();
  }
}

export function requireAuth(req, res, next) {
  if (!res.locals.session?.user) {
    return res.status(401).json({ message: "Not Authenticated" });
  }
  next();
}

export function requirePermissions(
  requiredPermissions,
  { onlyAdmin = false } = {}
) {
  return (req, res, next) => {
    const user = res.locals.session.user;
    if (!user) return res.status(401).json({ message: "Not Authenticated" });

    if (onlyAdmin && user.role !== "admin")
      return res.status(403).json({ message: "Admin only" });
    if (user.role === "admin") return next();
    if (user.role === "store_owner") return next();

    const perms = user.permissions || [];
    const hasAll = requiredPermissions.every((p) => perms.includes(p));
    if (!hasAll) return res.status(403).json({ message: "Forbidden" });

    next();
  };
}

// import { getSession } from "@auth/express";

// // Helper function to check permissions
// const hasPermission = (
//   user,
//   requiredPermissions,
//   { onlyAdmin = false } = {}
// ) => {
//   if (!user) return false;

//   // If this permission is for admin only, enforce it
//   if (onlyAdmin && user.role !== "admin") return false;

//   // Admins always get all permissions
//   if (user.role === "admin") return true;

//   // Store owners get access to everything except admin-only stuff
//   if (user.role === "store_owner") {
//     return true;
//   }

//   // Staff: check their specific permissions
//   return requiredPermissions.every((perm) => user.permissions.includes(perm));
// };

// // Middleware to authenticate the user
// export async function authenticatedUser(req, res, next) {
//   try {
//     const session = await getSession(req); // Get session from cookies

//     // console.log("Session Data:", session);

//     res.locals.session = session; // Store in res.locals for easy access

//     if (session) {
//       return next(); // Continue if authenticated
//     }

//     // Handle unauthorized access
//     if (req.headers.accept?.includes("application/json")) {
//       return res.status(401).json({ message: "Not Authenticated" });
//     }
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// // Middleware to check if user has required permissions
// export function authorizeUser(requiredPermissions, { onlyAdmin = false } = {}) {
//   return async (req, res, next) => {
//     try {
//       const session = res.locals.session || (await getSession(req));

//       if (!session?.user) {
//         return res.status(401).json({ message: "Not Authenticated" });
//       }

//       const userPermissions = session.user.permissions || [];

//       // Check if the user has permission (including checking for admin-only permissions)
//       const hasPermissionResult = hasPermission(
//         session?.user,
//         requiredPermissions,
//         { onlyAdmin }
//       );

//       if (!hasPermissionResult) {
//         return res.status(403).json({ message: "Forbidden: Access Denied" });
//       }

//       next();
//     } catch (error) {
//       console.error("Authorization error:", error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
// }

// // Middleware to retrieve the current session
// export async function currentSession(req, res, next) {
//   try {
//     const session = await getSession(req);
//     res.locals.session = session; // Store session for later use
//     next();
//   } catch (error) {
//     console.error("Session retrieval error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
