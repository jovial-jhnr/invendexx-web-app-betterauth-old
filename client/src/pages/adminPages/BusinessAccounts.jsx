import BusinessManagementTable from "@/components/tables/admin-tables/business-management/business-management-table";

function BusinessAccounts() {
  return (
    <div className="page">
      <h1>Business Accounts</h1>
      <p>Manage your business here.</p>
      <div>
        <BusinessManagementTable />
      </div>
    </div>
  );
}
export default BusinessAccounts;
