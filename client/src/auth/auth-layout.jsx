import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";
import authpage_image from "../assets/auth-images/authpage_image.png";

export default function AuthPageLayout({ children }) {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2 m-2  rounded-md">
        {/* The image section */}
        <div className="bg-muted relative hidden lg:block">
          <img
            src={authpage_image}
            alt="Image for auth page"
            className="absolute inset-0 h-full w-full  dark:brightness-[0.2] dark:grayscale"
          />
        </div>

        {/* The authpage wrapper */}
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link to="/" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Cobocabal Inc.
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
