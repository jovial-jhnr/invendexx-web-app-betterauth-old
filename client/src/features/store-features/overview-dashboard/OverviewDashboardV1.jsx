import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
// import { useSession } from "@/hooks/useSession.jsx";
import { StatCard } from "@/components/DashFeature/StoreFeatures/storeCharts/StatCard.jsx";
import TotalCustomers from "@/components/DashFeature/StoreFeatures/storeCharts/TotalCustomers";
import AdminSalesCard from "@/components/DashFeature/SyntaxFeatures/syntaxCharts/AdminSalesCard";
import StoreSwitcher from "@/components/GeneralFeatures/store-swittcher";
import { authClient } from "@/lib/auth-client";
import MainStoreDashStats from "@/dashboard-stats/store-dashstats/main-store-dashstats";

function OverviewDashboardV1() {
  // const { data: user } = useSession();
  const { data: session } = authClient.useSession();

  return (
    <>
      <div className="flex flex-row justify-between ml-2 ">
        <div className="mt-2">
          <h3 className="font-medium font-roboto text-md md:text-lg">
            Welcome, {session?.user.firstName}
          </h3>
          <p className="font-sans font-medium text-md md:text-md">
            Overview of your business system
          </p>
        </div>
        <hr />
        <div className="flex flex-row gap-2 mt-2">
          <p className="font-medium text-sm md:text-md items-center">
            {/* Your on the free plan */}
          </p>
          <Button className="flex flex-end mx-3 my-2 bg-blue-600">
            <CheckCircle size="4" />
            Unpgrade
          </Button>
        </div>
      </div>

      <div className="ml-2 pt-3 pb-3 text-end">
        <Button className="mr-2 text-white bg-green-600 hover:bg-green-400">
          See Orders
        </Button>

        <Button className="mr-2 text-white bg-green-600 hover:bg-green-400">
          See Analytics
        </Button>
      </div>

      <div className="m-1 pl-2">
        <MainStoreDashStats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {/* Left column - 2/3 on desktop */}
        <div className="md:col-span-2 p-0 m-2">
          <div className="my-2 mx-1">
            <AdminSalesCard />
          </div>
        </div>

        {/* Right column - 1/3 on desktop */}
        <div className="md:col-span-1  p-0 m-2">
          <div className="my-2 mx-1">
            <TotalCustomers />
          </div>
        </div>
      </div>
    </>
  );
}

export default OverviewDashboardV1;
