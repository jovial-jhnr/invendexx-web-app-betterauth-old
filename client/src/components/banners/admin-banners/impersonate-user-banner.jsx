/* This component is a banner that lets admin (owner of web app) impersonate users in the web app */

import {
  Banner,
  BannerAction,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "@/components/ui/shadcn-io/banner";

import { CircleAlert, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

// Main Function
export default function ImpersonateUserBanner() {
  // Navigation
  const navigate = useNavigate();

  // Users data fetched here
  const {
    data: session,
    refetch: refetchSession, //Users session is fetched again
  } = authClient.useSession();

  return (
    <>
      <div>
        {session?.session?.impersonatedBy && (
          <Banner className="bg-indigo-600">
            <BannerIcon icon={UserCog} className="dark: text-white" />
            <BannerTitle className="dark: text-white">
              You (App Owner) are signed as{" "}
              <span className="capitalize font-bold">
                {session?.user?.firstName}
              </span>{" "}
              with role{" "}
              <span className="capitalize font-bold">
                {session?.user?.role}
              </span>
            </BannerTitle>
            <BannerAction
              className=" dark: text-white light:text-black"
              onClick={async () => {
                try {
                  await authClient.admin.stopImpersonating();
                  refetchSession();
                  toast.success("System Stopped impersonating User");
                  navigate("/coredashboard");
                } catch (error) {
                  toast.error("Failed to stop impersonating User");
                }
              }}
            >
              Back to Mains
            </BannerAction>

            {/* Closes the banner */}
            <BannerClose className="" />
          </Banner>
        )}
      </div>
    </>
  );
}
