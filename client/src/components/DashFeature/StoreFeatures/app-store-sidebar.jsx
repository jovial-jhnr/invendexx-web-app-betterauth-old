import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  LayoutPanelLeft,
  Notebook,
  BaggageClaim,
  User,
  Album,
  ArrowRightLeft,
  HandCoins,
  Ship,
  WalletCards,
  BadgeInfo,
  CircleUser,
  MapPinned,
  ScrollText,
  ReceiptText,
  MemoryStick,
  HeartHandshake,
  Package2,
  WalletMinimal,
  Landmark,
  Warehouse,
  Coins,
  HardDrive,
  ChartColumn,
  SidebarOpenIcon,
} from "lucide-react";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavStoreMain } from "@/components/DashFeature/StoreFeatures/nav-store-main";
// import { NavProjects } from "@/components/nav-projects"
import { NavStoreSecondary } from "@/components/DashFeature/StoreFeatures/nav-store-secondary";
import { NavStoreUser } from "@/components/DashFeature/StoreFeatures/storeComponent/nav-store-user";
import ImpersonateUserBar from "@/features/admin-features/user-management/impersonate-user-bar";
import permAccess from "@/hooks/permAccess";
import { authClient } from "@/lib/auth-client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarOptInForm from "@/components/GeneralFeatures/sidebar-opt-in-form";

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },

  navStoreMain: [
    {
      title: "Overview Dashboard",
      url: "/storedashboard",
      icon: LayoutPanelLeft,
    },
    {
      title: "Products",
      url: "/storedashboard/products",
      icon: Package2,
      // permission: "manage_products"
    },
    {
      title: "Orders",
      url: "/storedashboard/orders",
      icon: BaggageClaim,
      // permission: "manage_orders"
    },
    {
      title: "Point of Sale",
      url: "/storedashboard/point-of-sale",
      icon: HardDrive,
      // permission: "manage_point_of_sale"
    },
    {
      title: "Ratings & Reviews",
      url: "/storedashboard/ratings-and-reviews",
      icon: HeartHandshake,
      // permission: "manage_reviews"
    },
    {
      title: "Customers",
      url: "/storedashboard/customers",
      icon: User,
      //permission: "manage_customers"
    },
    {
      title: "Purchases",
      url: "/storedashboard/purchases",
      icon: Album,
      // permission: "manage_purchases"
    },
    {
      title: "Analytics",
      url: "/storedashboard/analytics",
      icon: ChartColumn,
      // permission: "manage_analytics"
    },

    {
      title: "Wallet",
      url: "/storedashboard/wallet",
      icon: WalletMinimal,
      // permission: "manage_wallet"
    },

    {
      title: "Transactions",
      url: "/storedashboard/transactions",
      icon: ArrowRightLeft,
      // permission: "manage_transactions"
    },
    {
      title: "Expenses",
      url: "/storedashboard/expenses",
      icon: HandCoins,
      // permission: "manage_expenses"
    },
    {
      title: "Shipping",
      url: "/storedashboard/shipping",
      icon: Ship,
      // permission: "manage_shipping"
    },
    {
      title: "Warehouse",
      url: "/storedashboard/warehouse",
      icon: Warehouse,
      // permission: "manage_warehouse"
    },
  ],

  navStoreSecondary: [
    {
      title: "Store Settings",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Store Details",
          url: "/storedashboard/store-details",
          icon: BadgeInfo,
        },
        {
          title: "Staff Accounts",
          url: "/storedashboard/staff-accounts",
          icon: CircleUser,
        },
        {
          title: "Locations",
          url: "/storedashboard/locations",
          icon: MapPinned,
        },
        {
          title: "Plans & Billing",
          url: "/storedashboard/plans-and-billings",
          icon: ReceiptText,
        },
        {
          title: "Bank Details",
          url: "/storedashboard/bank-details",
          icon: Landmark,
        },
        {
          title: "Payouts & Earnings",
          url: "/storedashboard/payouts-and-earnings",
          icon: Coins,
        },
        {
          title: "Integrations",
          url: "/storedashboard/store-integration",
          icon: MemoryStick,
        },
        {
          title: "Api Keys",
          url: "/storedashboard/apikeys",
          icon: Bot,
        },
        {
          title: "Support",
          url: "/storedashboard/support",
          icon: LifeBuoy,
        },
        {
          title: "Feedback",
          url: "/storedashboard/feedback",
          icon: Send,
        },
      ],
    },
  ],
};

export function AppStoreSidebar(props) {
  //  Getting user data from session
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const { data: activeOrganization } = authClient.useActiveOrganization();
  // console.log("Store", activeOrganization);

  // Filter navMain based on permissions
  const filteredNavMain = data.navStoreMain.filter(
    (item) => !item.permission || permAccess(item.permission, session?.user)
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
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    {activeOrganization ? (
                      <span className="truncate text-md font-semibold">
                        {activeOrganization?.name}
                      </span>
                    ) : (
                      <>
                        <span className="truncate text-md font-semibold">
                          Invendexx
                        </span>
                        <span>Technologies</span>
                      </>
                    )}
                    {/* <span className="truncate text-xs">Technologies</span> */}
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <NavStoreMain items={filteredNavMain} className="text-xl" />
          {/* <NavProjects projects={data.projects} /> */}
          {(session?.user?.role === "owner" ||
            session?.user?.role === "admin") && (
            <NavStoreSecondary
              items={data.navStoreSecondary}
              className="mt-auto text-md"
            />
          )}
        </SidebarContent>
        <SidebarFooter>
          <div>{/* <SidebarOptInForm /> */}</div>
          <NavStoreUser user={data.user} />
          {/* <ImpersonateUserBar /> */}
        </SidebarFooter>
      </Sidebar>
    </ScrollArea>
  );
}
