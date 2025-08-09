import BusinessManagementTable from "@/components/tables/admin-tables/business-management/business-management-table";
import BusinessStats from "@/dashboard-stats/admin-dashstats/business-dashstats";

function BusinessAccountV1() {
  return (
    <>
      <div>
        <div className="page">
          <h1 className="m-3 text-xl font-semibold">Business Accounts</h1>
          <p>Manage your business here.</p>
        </div>
        <div>
          <div className="my-3 mx-1">
            <BusinessStats />
          </div>
          <div className="m-1">
            <BusinessManagementTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessAccountV1;
