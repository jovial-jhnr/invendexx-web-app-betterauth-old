import { HardDrive } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import backendUrl from "@/lib/backendUrl";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { AppStoreSidebar } from "@/components/DashFeature/StoreFeatures/app-store-sidebar";

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
} from "@/components/ui/select";
import ModeToggle from "@/components/GeneralFeatures/mode-toggle";

const getLocation = async ({ queryKey }) => {
  const [_key, storeId] = queryKey;
  const res = await backendUrl.get(`locations/${storeId}/store-locations`);
  return res?.data?.data?.stores;
};

export default function StoreDashboard() {
  const { data: activeOrganization } = authClient.useActiveOrganization();

  const storeId = activeOrganization?.id;

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
              <Select className="border border-none">
                <SelectTrigger>
                  <SelectValue
                    placeholder="Headquaters"
                    className="text-blue-500"
                  />
                </SelectTrigger>
                <SelectContent className="text-blue-500 font-notoserif">
                  <SelectItem value="headquaters">Headquaters</SelectItem>
                  <SelectItem value="cleancity">CleanCity Store</SelectItem>
                  <SelectItem value="hollowcity">HollowCity Store</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-end justify-between items-end flex ml-auto gap-2">
            <div className="sm:flex hidden mr-3">
              <Link
                to="/storedashboard/point-of-sale"
                className="flex flex-row font-roboto hover: text-green-300 bg:bg-inherit gap-2 p-2 rounded-lg "
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
