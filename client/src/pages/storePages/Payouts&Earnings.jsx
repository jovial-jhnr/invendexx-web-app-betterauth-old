import PayoutTable from "@/components/tables/store-tables/payouts-table/payout-table";

function PayoutsandEarnings() {
  return (
    <>
      <div>
        <div className="m-2">
          <h1 className="font-semibold text-xl">Payouts and Earnings</h1>
          <p className="text-md font-medium">
            Manage your payouts and earnings
          </p>
        </div>
        <PayoutTable />
      </div>
    </>
  );
}

export default PayoutsandEarnings;
