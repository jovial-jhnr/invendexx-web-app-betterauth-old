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
import Spinner from "@/components/ui/spinner";

const storeEditRoleSchema = z.object({
  role: z.string().min(1, "Role Name is required or more letters"),
  roleColor: z.string().nullable(),
  permission: z.record(z.string(), z.array(z.string())).optional(),
});

//         =====MAIN FUNCTION=====
export default function StoreEditRoleForm({
  className,
  open,
  openChange,
  roles,
}) {
  // User details
  //   const { data: session } = authClient.useSession();
  //   const rolle = session?.user?.role;

  // Store details here
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { id: storeId } = activeOrganization;

  // const options = [
  //   { label: "Create", value: "create" },
  //   { label: "Update", value: "update" },
  //   { label: "View", value: "view" },
  //   { label: "Share", value: "share" },
  //   { label: "Delete", value: "delete" },
  // ];

  const resources = ["product", "user", "order", "marketing", "analytics"];
  const actions = ["create", "view", "manage", "update", "delete", "share"];

  // The user for registration
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(storeEditRoleSchema),
  });

  // Populate form with existing role data
  React.useEffect(() => {
    if (open && roles) {
      // console.log("Have Roles", roles);
      reset({
        roleName: roles?.role,
        roleColor: roles?.roleColor,
        description: roles?.description || "",
      });
    }
  }, [open, roles, reset]);

  const onSubmit = async (data) => {
    console.log("Sub Role", data);
    const { role, roleColor, permission } = data;
    const { id: roleId } = roles;

    try {
      // Create user role here
      await authClient.organization.updateRole(
        {
          roleName: role,
          roleId: roleId,
          organizationId: storeId,
          data: {
            // required
            permission,
            roleName: role,
            roleColor,
          },
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
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to change user role");
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
            <Label htmlFor="role" className="text">
              Role Name
            </Label>
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
            {resources.map((resource) => (
              <div key={resource} className="my-3">
                <Label className="capitalize">{resource} Permissions</Label>
                <Controller
                  key={resource}
                  control={control}
                  name={`permission.${resource}`} // permission.resourceName
                  defaultValue={[]}
                  render={({ field }) => (
                    <MultiSelector
                      values={field.value?.map((action) => ({
                        value: action,
                        label: action,
                      }))}
                      onValuesChange={(vals) =>
                        field.onChange(vals.map((v) => v.value))
                      }
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput
                          placeholder={`Actions for ${resource}`}
                        />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {actions.map((action) => (
                            <MultiSelectorItem
                              key={action}
                              value={action}
                              label={action}
                            >
                              {action}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  )}
                />
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="my-4 mx-3">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner />
                  <span>"Update Role......... " </span>
                </>
              ) : (
                "Update Role "
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
