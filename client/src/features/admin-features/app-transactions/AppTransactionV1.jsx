import AppTransactionTable from "@/components/tables/admin-tables/app-transactions-tables/app-transaction-table";

export default function AppTransactionV1() {
  return (
    <>
      <div>
        <div className="m-3">
          <h1 className="text-2xl font-semibold">App Transactions</h1>
        </div>

        {/* Stats */}
        <div></div>

        <div>
          <AppTransactionTable />
        </div>
      </div>
    </>
  );
}
