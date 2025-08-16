import ModeToggle from "@/components/GeneralFeatures/mode-toggle";
import { Outlet, Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { HardDrive } from "lucide-react";
import { AppAdminSidebar } from "@/components/DashFeature/SyntaxFeatures/app-admin-sidebar";
import { NavAdminUser } from "@/components/DashFeature/SyntaxFeatures/syntaxComp.jsx/nav-admin-user";
import { Separator } from "@/components/ui/separator";

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
import { useSession } from "@/hooks/useSession.jsx";

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <AppAdminSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center bg-inherit sticky top-0 z-10 gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          <div>
            <div className="hidden sm:flex flex-row items-center gap-2">
              <Label htmlFor="location-select">Location:</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Headquaters" />
                </SelectTrigger>
                <SelectContent>
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
                className="flex flex-row gap-2 p-2 rounded-lg bg-inherit border border-blue-500"
              >
                <HardDrive className="text-blue-600" />
                Point of Sale
              </Link>
            </div>
          </div>

          <div className="text-end justify-between flex flex-grow gap-2" a>
            {/* <NavAdminUser user={data.user}/> */}
          </div>
        </header>

        <div className=" relative grid grid-cols-1 gap-4 p-2 pt-0">
          <div className=" relative min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
