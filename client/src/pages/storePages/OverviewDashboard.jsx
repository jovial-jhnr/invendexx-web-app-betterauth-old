import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
// import { useSession } from "@/hooks/useSession.jsx";
import { StatCard } from "@/components/DashFeature/StoreFeatures/storeCharts/StatCard.jsx";
import TotalCustomers from "@/components/DashFeature/StoreFeatures/storeCharts/TotalCustomers";
import OverallSalesCard from "@/components/DashFeature/StoreFeatures/storeCharts/OverallSalesCard";
import AdminSalesCard from "@/components/DashFeature/SyntaxFeatures/syntaxCharts/AdminSalesCard";
import TableData from "@/components/GeneralFeatures/TableData";
import FeatFlagModal from "@/app/Modal/FeatFlagModal/FeatFlagModal";
import StoreSwitcher from "@/components/GeneralFeatures/store-swittcher";
import { authClient } from "@/lib/auth-client";

function OverviewDashboard() {
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

      {/* <div>
        <StoreSwitcher />
      </div> */}

      <div className="m-1 pl-2">
        <StatCard />
      </div>

      <div className="flex flex-col lg:flex-row  p-1 gap-3 ">
        <div className="pt-1 w-full sm:w-2/3 lg:w-2/3 ">
          <AdminSalesCard />
        </div>

        <div className="pt-3 w-full sm:w-2/3 lg:w-1/3 ">
          <TotalCustomers />
        </div>
      </div>
      {/* <div className="m-2">
        <TableData />
      </div> */}
    </>
  );
}

export default OverviewDashboard;
