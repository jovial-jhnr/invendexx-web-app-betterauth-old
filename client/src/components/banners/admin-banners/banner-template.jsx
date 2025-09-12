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

export default function BannerTemplate() {
  // Navigation
  const navigate = useNavigate();

  return (
    <>
      <div>
        {/* Banner details */}
        <div>
          <Banner className="">
            <BannerIcon icon={CircleAlert} className="" />
            <BannerTitle className="">Important message</BannerTitle>
            <BannerAction className="">Learn more</BannerAction>
            <BannerClose />
          </Banner>
        </div>
      </div>
    </>
  );
}
