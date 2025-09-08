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

const storeAddRoleSchema = z.object({
  role: z.string(),
  roleColor: z.string(),
  permission: z.record(z.array(z.string().min(1))),
});

//         =====MAIN FUNCTION=====
export default function StoreAddRoleForm({ className }) {
  // User details
  //   const { data: session } = authClient.useSession();
  //   const rolle = session?.user?.role;

  // Store details here
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { id: storeId } = activeOrganization;

  const options = [
    { label: "Create", value: "create" },
    { label: "Update", value: "update" },
    { label: "View", value: "view" },
    { label: "Share", value: "share" },
    { label: "Delete", value: "delete" },
  ];

  // The user for registration
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(storeAddRoleSchema),
  });

  const onSubmit = async (data) => {
    const { role, roleColor, permission } = data;
    // const { id: userId } = user;

    try {
      // Create user role here
      await authClient.organization.createRole(
        {
          role, // required
          roleColor,
          permission,
          organizationId: storeId,
        },
        {
          onSuccess(ctx) {
            toast.success("Store Added successfully");
          },
          onError(ctx) {
            toast.error("Failed to Add Role");
          },
        }
      );
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
            <Label htmlFor="role">Role Name</Label>
            <Input type="text" id="role" {...register("role")} />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Role colors */}
          <div className="my-2">
            <Label htmlFor="roleColor">Role Color</Label>
            <Input
              type="color"
              id="roleColor"
              {...register("roleColor")}
              className=""
            />
            {errors.roleColor && (
              <p className="text-red-500 text-sm">{errors.roleColor.message}</p>
            )}
          </div>

          {/* Update Roles here */}
          <div className="my-2">
            <Label htmlFor="role" className="">
              User Roles
            </Label>
            <Controller
              control={control}
              name="" // 👈 plural, array
              defaultValue={[]} // 👈 MUST be array
              render={({ field }) => (
                <MultiSelector
                  values={field?.value?.map((analytics) => {
                    const roles = options.find(
                      (opt) => opt.value === analytics
                    );
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

          {/* <div className="my-2">
            <Label htmlFor="role" className="">
              User Roles
            </Label>
            <Controller
              control={control}
              name="" // 👈 plural, array
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
          </div> */}

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
