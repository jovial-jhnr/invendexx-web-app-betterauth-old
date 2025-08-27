import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FileUploader } from "@/components/file-uploader";
import toast from "react-hot-toast";
import useStoreCategory from "@/hooks/storeHooks/use-store-category";
import useStoreLocation from "@/hooks/storeHooks/use-store-location";
import { authClient } from "@/lib/auth-client";

import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/multiselect";
import backendUrl from "@/lib/backendUrl";

const editRoleSchema = z.object({
  firstName: z.string(),
  role: z.array(z.string()).nonempty("At least one role is required"),
});

export default function AdminEditRoleForm({
  className,
  user,
  open,
  onSuccess,
}) {
  // User details
  const { data: session } = authClient.useSession();
  const rolle = session?.user?.role;

  // All Role options
  const options = [
    { label: "Admin", value: "admin" },
    { label: "Store Owner", value: "owner" },
    { label: "Marketer", value: "marketer" },
    { label: "Cashier", value: "cashier" },
    { label: "Manager", value: "manager" },
  ];

  // Store details from authClient.
  // const { data: activeOrganization } = authClient.useActiveOrganization();
  // const storeId = activeOrganization?.id;

  // The user for registration
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editRoleSchema),
  });

  React.useEffect(() => {
    if (open && user) {
      reset({
        firstName: user?.firstName,
        role: user?.role ? user.role.split(",") : [],
      });
    }
  }, [open, user, reset]);

  const onSubmit = async (data) => {
    const { role } = data;
    const { id: userId } = user;

    try {
      // Admin Check
      if (rolle !== "admin") {
        return toast.error("You are not allowed this action");
      }

      // Change user role here
      await authClient.admin.setRole(
        {
          userId,
          role,
          // this can also be an array for multiple roles (e.g. ["admin", "sale"])
        },
        {
          onSuccess(ctx) {
            toast.success("User Role Changed successfully");
          },
          onError(ctx) {
            toast.error("Failed to change user role");
          },
        }
      );

      onSuccess?.();
    } catch (error) {
      // toast.error("Failed to change user role");
    }
  };

  return (
    <>
      <form
        className={cn("grid gap-6 mx-2", className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="field my-2">
            <Label htmlFor="name">User Name</Label>
            <Input type="text" id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Update Roles here */}
          <div className="field my-2">
            <Label htmlFor="role" className="">
              User Roles
            </Label>
            <Controller
              control={control}
              name="role" // 👈 plural, array
              defaultValue={[]} // 👈 MUST be array
              render={({ field }) => (
                <MultiSelector
                  values={field?.value?.map((userRole) => {
                    const roles = options.find((opt) => opt.value === userRole);
                    return { value: roles?.value, label: roles?.label };
                  })} // Values must be mapped for it to work
                  onValuesChange={(vals) =>
                    field.onChange(vals?.map((v) => v.value))
                  } //onValuesChange must be mapped for it to work
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput
                      placeholder="Update User Roles"
                      className="text-sm"
                    />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {options?.map((option) => (
                        <MultiSelectorItem
                          key={option?.value}
                          value={option?.value}
                          label={option?.label}
                        >
                          {option?.label}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              )}
            />
          </div>

          {/* Submit */}
          <div className="my-4 mx-3">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving Changes......... " : "Save Changes "}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
