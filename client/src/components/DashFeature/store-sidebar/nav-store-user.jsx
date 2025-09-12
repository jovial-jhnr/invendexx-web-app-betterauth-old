import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  HatGlasses,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import signOut from "@/auth/signout";
import Spinner from "@/components/ui/spinner";

export function NavStoreUser({}) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  if (isPending) return <Spinner />;

  if (error) return;
  <p className="text-red-600">Error fetching session</p>;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className=" data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={session?.user?.firstName}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.firstName} {session?.user?.lastName}
                </span>
                <span className="truncate text-s">{session?.user?.email}</span>
                {/* <span className="truncate text-xs">{session?.user?.role}</span> */}
                {session?.session?.impersonatedBy && (
                  <span className="truncate text-xs text-green-500">
                    <p>Impersonating User</p>
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={session?.user?.firstName}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    <p>Welcome, {session?.user?.firstName}</p>
                  </span>
                  <span className="truncate text-md">
                    {session?.user?.email}
                  </span>
                  {/* <span className="truncate text-md">{user.role}</span> */}
                  {session?.session?.impersonatedBy && (
                    <span className="truncate text-xs text-green-500">
                      <p>Impersonating User</p>
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>
              <Sparkles />
                <Link to="/pricing">
                Upgrade to Pro
                </Link>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                <Link to="/storedashboard/account">Account</Link>
              </DropdownMenuItem>

              {/* <DropdownMenuItem>
                <CreditCard />
                <Link to="/billing-page">
                 Billing
                </Link>
              </DropdownMenuItem> */}

              <DropdownMenuItem>
                <Bell />
                <Link>Notifications</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              {/* Impersonation button */}
              {session?.session?.impersonatedBy && (
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      await authClient.admin.stopImpersonating();
                      refetch();
                      toast.success("System Stopped impersonating User");
                      navigate("/coredashboard");
                    } catch (error) {
                      toast.error("Failed to stop impersonating User");
                    }
                  }}
                >
                  <HatGlasses className="text-blue-600" />
                  Stop Impersonating User
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {/* LogOut function */}
            <DropdownMenuItem>
              <LogOut className="text-red-500" />
              <button
                className="text-red-500"
                onClick={() => {
                  signOut();
                }}
              >
                Log Out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
