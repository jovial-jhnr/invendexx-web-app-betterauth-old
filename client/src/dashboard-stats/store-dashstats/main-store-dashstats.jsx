// components/StatCard.js
import DashboardCard from "@/components/ui/dashboard-card";
import Spinner from "@/components/ui/spinner";
import backendUrl from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

import { Users, PackageOpen, ShoppingBasket, Banknote } from "lucide-react";

const fetchStoreStats = async ({ queryKey }) => {
  const [_key, storeId] = queryKey;

  const res = await backendUrl.get(
    `/stores/store/${storeId}/dashstats/main-store-stats`
  );
  console.log("Main Sats", res.data);

  return {
    // totalRevenue: res?.data?.result?.totalRevenue?._sum?.amount || 0.0,
    totalCustomers: res?.data?.result?.totalCustomers || 0,
    totalOrderRevenue:
      res?.data?.result?.totalOrderRevenue?._sum?.grandTotal || 0.0,
    totalOrders: res?.data?.result?.totalOrders || 0,

    totalProduct: res?.data?.result?.totalProducts || 0,
  };
};

// Main function
export function MainStoreDashStats() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  const { data: dashstat, isLoading } = useQuery({
    queryKey: ["dash", storeId],
    queryFn: fetchStoreStats,
    enabled: !!storeId,
  });

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Order Revenue",
      description: "Total app revenue",
      content: `₵ ${dashstat?.totalOrderRevenue} ` || 0,
      icon: Banknote,
    },
    {
      title: "Total Orders",
      description: "Available orders",
      content: dashstat?.totalOrders || 0,
      icon: ShoppingBasket,
    },

    {
      title: " Total Customers",
      description: "Total users",
      content: dashstat?.totalCustomers || 0,
      icon: Users,
    },
    {
      title: "Total Products",
      description: "Total active now",
      content: dashstat?.totalProduct || 0,
      icon: PackageOpen,
    },

    // {
    //   title: "Profits",
    //   description: "+10% this month",
    //   content: "₵2,000,000",
    //   icon: TrendingUp,
    // },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
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

export default MainStoreDashStats;
