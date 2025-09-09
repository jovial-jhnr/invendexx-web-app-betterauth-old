import { StatCard } from "@/components/DashFeature/StoreFeatures/storeCharts/StatCard";
import TotalCustomers from "@/components/DashFeature/StoreFeatures/storeCharts/TotalCustomers";
import AdminSalesCard from "@/components/DashFeature/SyntaxFeatures/syntaxCharts/AdminSalesCard";
import ProductCategoryChart from "@/components/DashFeature/SyntaxFeatures/syntaxCharts/ProductCategoryChart";
import SystemHealthCard from "@/components/DashFeature/SyntaxFeatures/syntaxCharts/SystemHealthCard";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import MainAdminDashStats from "@/dashboard-stats/admin-dashstats/main-admin-dashstats";
import StoreAddRoleForm from "@/Forms/roles-setup/store-roles/store-add-role-form";
import StoreAddRoleModal from "@/modal/role-modal/store-role-modal/store-role-modal";

export default function CoreDashboard() {
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
            <StoreAddRoleModal />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {/* Left column - 2/3 on desktop */}
            <div className="md:col-span-2 p-0">
              <div className="my-2 mx-1">
                <AdminSalesCard />
              </div>
              <div className="my-2 mx-1">
                <ProductCategoryChart />
              </div>
            </div>

            {/* Right column - 1/3 on desktop */}
            <div className="md:col-span-1 p-0 ">
              <div className="my-2 mx-1">
                <SystemHealthCard />
              </div>
              <div className="my-2 mx-1">
                <TotalCustomers />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
