// This function checks if a user has permission to access a certain resource
// based on their role and permissions.

const permAccess = (perm, user) => 
    
    user?.role === "store_owner" || 

    user?.role === "admin" ||

    user?.permissions.includes(perm);

export default permAccess;
