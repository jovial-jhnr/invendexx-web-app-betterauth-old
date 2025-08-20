// components/StatCard.js
import DashboardCard from "@/components/ui/dashboard-card";
import Spinner from "@/components/ui/spinner";
import backendUrl from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { Convert } from "easy-currencies";

import {
  DollarSign,
  ShoppingCart,
  Users,
  UserCheck,
  Package,
  TrendingUp,
  Store,
} from "lucide-react";

const fetchAdminStats = async () => {
  const res = await backendUrl.get("/admin/dashstats/main-admin-stats");
  //   console.log("Main Sats", res.data);

  return {
    totalRevenue: res?.data?.result?.totalRevenue?._sum?.amount || 100000.0,
    totalStores: res?.data?.result?.totalStores || 0,
    totalUsers: res?.data?.result?.totalUsers || 0,
    totalActiveUsers: res?.data?.result?.totalActiveUsers || 0,
    orderRevenue: res?.data?.result?.orderRevenue?._sum?.grandTotal || 1000.0,
  };
};

//  ======MAIN FUNCTION=====
export function MainAdminDashStats() {
  // Store data from authClient
  const { data: activeOrganization } = authClient.useActiveOrganization();

  const currency = activeOrganization?.currency;
  const baseCurrency = activeOrganization?.storeBaseCurrency;

  const { data: dashstat, isLoading } = useQuery({
    queryKey: ["dash"],
    queryFn: fetchAdminStats,
    staleTime: 5 * 60 * 1000,
  });

  const stats = [
    {
      title: "Total Revenue",
      description: "Total app revenue",
      content: `${currency} ${dashstat?.totalRevenue} ` || 0,
      icon: DollarSign,
    },
    {
      title: "Total Stores",
      description: "Available stores",
      content: dashstat?.totalStores || 0,
      icon: Store,
    },

    {
      title: " Total Users",
      description: "Total users",
      content: dashstat?.totalUsers || 0,
      icon: Users,
    },
    {
      title: "Active Users",
      description: "Total active now",
      content: dashstat?.totalActiveUsers || 0,
      icon: UserCheck,
    },
    {
      title: "Order Revenue",
      description: "Total orders revenue",
      content: `${currency} ${dashstat?.orderRevenue}` || 0,
      icon: Package,
    },
    // {
    //   title: "Profits",
    //   description: "+10% this month",
    //   content: "₵2,000,000",
    //   icon: TrendingUp,
    // },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
      {stats.map((stat, index) => (
        <DashboardCard
          key={index}
          title={stat.title}
          description={stat.description}
          icon={stat.icon}
        >
          <div className="text-xl">{stat.content}</div>
        </DashboardCard>
      ))}
    </div>
  );
}

export default MainAdminDashStats;
