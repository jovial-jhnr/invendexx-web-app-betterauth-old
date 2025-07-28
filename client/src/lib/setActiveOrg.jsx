import { authClient } from "@/lib/auth-client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

function ActiveOrganization() {
  //  Get the list of stores of store owner
  const { data: organizations } = authClient.useListOrganizations();
  //   console.log("Org", organizations);
  const orgId = organizations?.id;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { activeOrgId } = data; // this holds the selected org ID

    await authClient.organization.setActive({
      organizationId: activeOrgId,
    });

    navigate("/storedashboard");
  };

  return (
    <>
      <div>
        {/* {organizations.map((org) => (
          <p>{org?.name}</p>
        ))} */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="location">Select Country</Label>
            <Controller
              control={control}
              name="activeOrgId"
              // rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Store" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Store</SelectLabel>
                      {organizations?.map((org) => (
                        <SelectItem key={org?.id} value={org?.id}>
                          {org?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Setting Active Store....." : "Set Active Store"}
          </Button>
        </form>
      </div>
    </>
  );
}

export default ActiveOrganization;
