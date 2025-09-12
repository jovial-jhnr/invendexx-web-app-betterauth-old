import {
  Banner,
  BannerAction,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "@/components/ui/shadcn-io/banner";
import { CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpgradePlanBanner() {
  // Navigation
  const navigate = useNavigate();

  return (
    <>
      <div>
        {/* Banner details */}
        <div>
          <Banner className="bg-teal-500 light: text-black font-roboto font-semibold">
            <BannerIcon icon={CircleAlert} className="" />
            <BannerTitle className="">
              Get more from your store! Upgrade to a higher plan Now.
            </BannerTitle>
            <BannerAction
              className="hover:text-inherit"
              onClick={() => {
                try {
                  navigate("/storedashboard/plans-and-billings");
                } catch (error) {
                  toast.error("Failed to move to billing Section");
                }
              }}
            >
              Upgrade Now
            </BannerAction>
            <BannerClose />
          </Banner>
        </div>
      </div>
    </>
  );
}
