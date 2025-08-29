import { HardDrive } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import backendUrl from "@/lib/backendUrl";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppStoreSidebar } from "@/components/DashFeature/StoreFeatures/app-store-sidebar";
import useStoreLocation from "@/hooks/storeHooks/use-store-location";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import ModeToggle from "@/components/GeneralFeatures/mode-toggle";

// const getLocation = async ({ queryKey }) => {
//   const [_key, storeId] = queryKey;
//   const res = await backendUrl.get(`locations/${storeId}/store-locations`);
//   return res?.data?.data?.stores;
// };

export default function StoreDashboard() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  const { data: locations } = useStoreLocation();

  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <AppStoreSidebar />

      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center 
         bg-inherit sticky top-0 z-10 gap-2"
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="ml-1" />

            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          {/* Location Selector for store owner */}
          <div className="">
            <div
              className="hidden sm:flex flex-row gap-2 p-1 border border-blue-600
             items-center bg: bg-inherit hover:bg-inherit rounded-md"
            >
              <Label htmlFor="location-select" className="font-notoserif">
                Location:
              </Label>

              <Select
                onValueChange={(value) => {
                  navigate(`/storedashboard/branch/${value}`);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Headquaters">
                    {/* {field.value || "location"} */}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Location</SelectLabel>
                    {locations?.map((location, idx) => (
                      <SelectItem key={idx} value={location?.id}>
                        {location?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-end justify-between items-end flex ml-auto gap-2">
            <div className="sm:flex hidden mr-3">
              <Link
                to="/storedashboard/point-of-sale"
                className="flex flex-row font-roboto text-inherit bg:bg-inherit gap-2 p-2 rounded-lg "
              >
                <HardDrive className="text-inherit hover:text-green-500" />
                Point of Sale
              </Link>
            </div>
          </div>

          {/* Toggle to awitch between light and dark mode */}
          <div className="mx-2 shadow-lg">
            <ModeToggle />
          </div>
        </header>

        <div className="relative grid grid-cols-1 gap-4 p-2 pt-0">
          <div className="relative min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
