import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export const signOut = async () => {
  try {
    await authClient.signOut();

    toast.success("Logged Out Successfully!!!");

    window.location.href = "/signin";
  } catch (error) {
    toast.error("Logout failed. Please try again.");
    // console.error("Logout error:", error.message);
    navigate("/error-404");
  }
};

export default signOut;
