import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InfoCard from "@/components/ui/infocard";
import BankModal from "@/modal/BankModal/bankmodal";
import { useQuery } from "@tanstack/react-query";
import backendUrl from "@/lib/backendUrl";
import { authClient } from "@/lib/auth-client";

// ✅ Get users bank details from here
const getBankDetail = async ({ queryKey }) => {
  const [_key, storeId] = queryKey;
  const res = await backendUrl.get(
    `api/stores/${storeId}/settings/get-bank-details`
  );

  // console.log("Bank Det", res.data.result?.bank);
  return res.data?.result;
};

function BankDetailV1() {
  // The organization details
  const { data: activeOrganization } = authClient.useActiveOrganization();

  const storeId = activeOrganization?.id;

  const {
    data: bank,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["banks", storeId],
    queryFn: getBankDetail,
    enabled: !!storeId, // ensures it runs only when storeId exists
  });

  return (
    <div>
      <div className="m-2">
        <h1 className="text-xl font-semibold">BANK DETAILS</h1>
        <p className="text-sm">Manage Bank Details</p>
      </div>

      <div className="text-end mr-2">
        <BankModal />
      </div>

      <div className="m-4">
        <InfoCard>
          <section className="m-2 font-semibold text-lg">
            Bank Information
          </section>

          <div className="text-start my-2">
            <Label htmlFor="bank-name">Bank Name</Label>
            <Input
              id="bank-name"
              type="text"
              value={bank?.bankName || ""}
              readOnly
            />
          </div>

          <div className="text-start my-2">
            <Label htmlFor="account-number">Account Number</Label>
            <Input
              id="account-number"
              type="text"
              value={bank?.accountNumber || ""}
              readOnly
            />
          </div>

          <div className="text-start my-2">
            <Label htmlFor="account-name">Account Name</Label>
            <Input
              id="account-name"
              type="text"
              value={bank?.accountName || ""}
              readOnly
            />
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

export default BankDetailV1;
