import { StatCard } from "@/components/DashFeature/StoreFeatures/storeCharts/StatCard";
import TotalCustomers from "@/components/DashFeature/StoreFeatures/storeCharts/TotalCustomers";
import AdminSalesCard from "@/components/DashFeature/SyntaxFeatures/syntaxCharts/AdminSalesCard";
import ProductCategoryChart from "@/components/DashFeature/SyntaxFeatures/syntaxCharts/ProductCategoryChart";
import { SystemHealthCard } from "@/components/DashFeature/SyntaxFeatures/syntaxCharts/SystemHealthCard";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import MainAdminDashStats from "@/dashboard-stats/admin-dashstats/main-admin-dashstats";

function AdminDashboard() {
  // const {data: user } = useSession();
  const { data: session } = authClient.useSession();

  return (
    <>
      <div>
        <div>
          {/* Admin information here */}
          <div>
            <div className="mt-2 pl-1">
              <h1 className="text-xl font-mono font-semibold">
                Hail! {session?.user?.firstName}{" "}
              </h1>
              <p className="font-medium">
                This is the summary of everything going on!
              </p>
            </div>
          </div>

          <div className=" text-end ml-2 pt-2">
            <Button className="mr-2 bg-green-600 hover:bg-green-400 ">
              Export
            </Button>

            <Button className=" mr-2 bg-white hover:bg-green-500 text-green-600 hover:text-white">
              Refresh
            </Button>
          </div>

          <div className="m-2 pl-1">
            <MainAdminDashStats />
          </div>

          {/* Dashboard stat and details below here */}
          {/* <div className="m-2 pl-1">
            <StatCard />
          </div> */}

          <div className="flex lg:flex-row flex-col p-1 gap-3">
            <div className="pt-1 w-full sm:w-2/3 lg:w-2/3 ">
              <AdminSalesCard />
            </div>

            <div className="pt-3 w-full sm:w-2/3 lg:w-1/3 ">
              <SystemHealthCard />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row p-1 gap-2">
            <div className="pt-1 sm:w-2/3  lg:w-2/3 ">
              <ProductCategoryChart />
            </div>

            <div className="pt-1 sm:w-1/3  lg:w-1/3">
              <TotalCustomers />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
