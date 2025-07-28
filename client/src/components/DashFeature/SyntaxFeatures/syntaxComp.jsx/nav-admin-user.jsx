import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

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

import Spinner from "@/components/ui/spinner";
import signOut from "@/auth/signout.jsx";
import { authClient } from "@/lib/auth-client";

export function NavAdminUser({}) {
  const { isMobile } = useSidebar();

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  if (isPending) return <Spinner />;

  if (error) return;
  <p className="text-red-600 flex justify-center">Error fetching session</p>;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
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
                  {session?.user?.firstName}
                </span>
                <span className="truncate text-s">{session?.user?.email}</span>
                <span className="truncate text-xs">{session?.user?.role}</span>
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
                    // src="https://github.com/shadcn.png"
                    alt={session?.user?.firstName}
                  />
                  <AvatarFallback>
                    {session?.user?.firstName?.charAt(0)}
                  </AvatarFallback>
                  {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    <p>Welcome, {session?.user?.firstName}</p>
                  </span>
                  <span className="truncate text-md">
                    {session?.user?.email}
                  </span>
                  {/* <span className="truncate text-md">{session?.user?.role}</span> */}
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
                <Link to="/syntaxdashboard/app-account">Account</Link>
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
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={signOut}>
              <LogOut className="text-red-500" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
