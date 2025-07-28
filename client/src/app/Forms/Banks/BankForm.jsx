import { useForm, Controller, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import backendUrl from "@/lib/backendUrl";
import { authClient } from "@/lib/auth-client";

import {
  Select,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Fetch list of banks
const fetchBanks = async () => {
  const response = await backendUrl.get("/api/paystack/banks", {
    withCredentials: true,
  });
  staleTime: 1000 * 60 * 5; // Cache for 5 minutes

  if (!response.data || !response.data.result.banks) {
    throw new Error("Failed to fetch banks");
  }
  // Return the list of banks
  // console.log(response?.data?.result?.banks);
  return response?.data?.result?.banks;
};

// Resolve bank account
const fetchresolveAccount = async ({ queryKey }) => {
  const [_key, accountNumber, bankCode] = queryKey;
  const response = await backendUrl.get(
    `/api/paystack/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`
  );
  staleTime: 1000 * 60 * 5; // Cache for 5 minutes

  // Dont touch it, keep it data.data
  return response.data?.data?.account_name;
};

// Main bank form function
function BankForm({ className }) {
  // Getting the storeId from the useStore.
  const { data: organizations } = authClient.useListOrganizations();

  const storeId = organizations?.[0]?.id;

  // console.log("All org", organizations?.[0]?.id);

  // Use form to manage the form submission.
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Fetch all banks
  const { data: banks } = useQuery({
    queryKey: ["allbanks"],
    queryFn: fetchBanks,
  });

  // Watch form fields
  const accountNumber = useWatch({ control, name: "account_number" });
  const bankCode = useWatch({ control, name: "bank_code" });
  const selectedBank = banks?.find((bank) => bank.code === bankCode);

  // Resolve account name when account number and bank code are valid
  const {
    data: resolvedAccountName,
    isLoading: isResolving,
    isError: isResolveError,
  } = useQuery({
    queryKey: ["resolveAccountName", accountNumber, bankCode],
    queryFn: fetchresolveAccount,
    // Only trigger when valid
    enabled: !!accountNumber && !!bankCode,
  });

  // This submit bank details of user to the backend to save
  const onSubmit = async (data) => {
    try {
      await backendUrl.post(
        "/api/stores/settings/add-bank-details",
        {
          storeId,
          bank_name: selectedBank.name,
          bank_code: data.bank_code,
          account_number: data.account_number,
          account_name: resolvedAccountName, // from useQuery
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Bank Details Saved Successfully");
      // console.log("Bank details saved successfully");
    } catch (error) {
      // console.error("Failed to save bank details:", error);
      toast.error("Could not save bank details");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("grid gap-6", className)}
    >
      <div className="form-section">
        <div className="gap-4">
          {/* Bank Name */}
          <div className="field my-2">
            <Label htmlFor="bank-name">Bank Name*</Label>
            <Controller
              control={control}
              name="bank_code"
              rules={{ required: "Bank is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Bank</SelectLabel>
                      {banks?.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.bank_code && (
              <p className="text-red-500">{errors.bank_code.message}</p>
            )}
          </div>

          {/* Account Number */}
          <div className="field my-2">
            <Label htmlFor="account-number">Account Number*</Label>
            <Input
              type="number"
              id="account-number"
              {...register("account_number")}
            />
            {errors.account_number && (
              <p className="text-red-500">{errors.account_number.message}</p>
            )}
          </div>

          {/* Account Name */}
          <div className="field my-2">
            <Label htmlFor="account-name">Account Name</Label>
            <Input
              type="text"
              id="account-name"
              value={
                isResolving
                  ? "Resolving..."
                  : isResolveError
                  ? "Unable to resolve"
                  : resolvedAccountName || ""
              }
              readOnly
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-3 w-full">
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}

export default BankForm;
