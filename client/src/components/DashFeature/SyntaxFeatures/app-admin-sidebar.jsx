import * as React from "react";

import {
  Command,
  SquareTerminal,
  WalletCards,
  BadgeInfo,
  LayoutDashboard,
  PackageOpen,
  Microchip,
  ShoppingBag,
  UserPen,
  ScrollText,
  ChartColumn,
  AppWindow,
  Workflow,
  CircleUserRound,
  Flag,
  MapPinHouse,
} from "lucide-react";

import { ScrollArea } from "../../ui/scroll-area";
import { ModeToggle } from "@/components/GeneralFeatures/mode-toggle";
import { NavAdminMain } from "@/components/DashFeature/SyntaxFeatures/nav-admin-main";
// import { NavProjects } from "@/components/nav-projects"
import { NavAdminSecondary } from "@/components/DashFeature/SyntaxFeatures/nav-admin-secondary";
import { NavAdminUser } from "@/components/DashFeature/SyntaxFeatures/syntaxComp.jsx/nav-admin-user";
import permAccess from "@/hooks/permAccess";
import { authClient } from "@/lib/auth-client";
// import { useSession } from "@/hooks/useSession";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },

  navAdminMain: [
    {
      title: "Admin Dashboard",
      url: "/syntaxdashboard",
      icon: LayoutDashboard,
      // permission: "manage_admin_dashboard"
    },

    {
      title: "Business Accounts",
      url: "/syntaxdashboard/business-accounts",
      icon: AppWindow,
      //permission: "manage_business_accounts"
    },

    {
      title: "User Managements",
      url: "/syntaxdashboard/user-managements",
      icon: UserPen,
      // permission: "manage_user_managements"
    },

    {
      title: "Feature Flags",
      url: "/syntaxdashboard/feature-flags",
      icon: Flag,
      // permission: "manage_app_transactions"
    },

    {
      title: "Product Catalogs",
      url: "/syntaxdashboard/product-catalogs",
      icon: PackageOpen,
      // permission: "manage_product_catalogs"
    },

    {
      title: "Order Overview",
      url: "/syntaxdashboard/order-overview",
      icon: ShoppingBag,
      // permission: "manage_order_overview"
    },

    {
      title: "Location Overview",
      url: "/syntaxdashboard/location-overview",
      icon: MapPinHouse,
      // permission: "manage_order_overview"
    },

    {
      title: "Reports and Analytics",
      url: "/syntaxdashboard/reports-and-analytics",
      icon: ChartColumn,
      //permission: "manage_app_analytics"
    },

    {
      title: "Subscriptions",
      url: "/syntaxdashboard/subscriptions",
      icon: ScrollText,
      //permission: "manage_subscriptions"
    },

    {
      title: "App Transactions",
      url: "/syntaxdashboard/app-transactions",
      icon: WalletCards,
      // permission: "manage_app_transactions"
    },

    {
      title: "System Integrations",
      url: "/syntaxdashboard/system-integrations",
      icon: Microchip,
      // permission: "manage_systems_integrations"
    },
  ],

  navAdminSecondary: [
    {
      title: "App Settings",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "App Details",
          url: "/syntaxdashboard/app-details",
          icon: BadgeInfo,
        },
        {
          title: "App Staff Account",
          url: "/syntaxdashboard/app-staff-account",
          icon: CircleUserRound,
        },
      ],
    },
  ],
};

export function AppAdminSidebar(props) {
  //  Getting user data from session
  const { data: session, error, referesh } = authClient.useSession();
  // Filter navMain based on permissions
  const filteredAdminNavMain = data.navAdminMain.filter(
    (item) => !item.permission || permAccess(item.permission, user)
  );

  return (
    <ScrollArea>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="http://localhost:5173">
                  <div
                    className="flex aspect-square size-8 items-center justify-center 
                   rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                  >
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-md leading-tight">
                    <span className="truncate font-semibold">Invendex</span>
                    <span className="truncate text-xs">Technologies</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavAdminMain items={filteredAdminNavMain} className="text-xl" />
          {/* <NavProjects projects={data.projects} /> */}

          {session?.user?.role === "admin" && (
            <NavAdminSecondary
              items={data.navAdminSecondary}
              className="mt-auto"
            />
          )}
        </SidebarContent>
        <SidebarFooter>
          <ModeToggle className="mr-3" />
          <NavAdminUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    </ScrollArea>
  );
}
