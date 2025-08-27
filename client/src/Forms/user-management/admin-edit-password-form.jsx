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
import { authClient } from "@/lib/auth-client";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

import backendUrl from "@/lib/backendUrl";

const editPasswordSchema = z.object({
  firstName: z.string(),
  newPassword: z.string(),
});

export default function AdminEditPasswordForm({
  className,
  user,
  open,
  onSuccess,
}) {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;

  //   Todo: add createdby for password change

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
    resolver: zodResolver(editPasswordSchema),
  });

  React.useEffect(() => {
    if (open && user) {
      reset({
        firstName: user?.firstName,
        password: user?.password,
      });
    }
  }, [open, user, reset]);

  const onSubmit = async (data) => {
    const { newPassword } = data;
    const { id: userId } = user;

    try {
      // Admin Check
      if (role !== "admin") {
        return toast.error("You are not allowed this action");
      }
      // Change user role here
      await authClient.admin.setUserPassword(
        {
          userId,
          newPassword,
          // this can also be an array for multiple roles (e.g. ["admin", "sale"])
        },
        {
          onSuccess(ctx) {
            toast.success("System Changed User Password successfully");
          },
          onError(ctx) {
            toast.error("Failed to change user password");
          },
        }
      );

      onSuccess?.();
    } catch (error) {
      // toast.error("Failed to change user password");
    }
  };

  return (
    <>
      <form
        className={cn("grid gap-6 mx-2", className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {/* User first Name */}
          <div className="field my-2">
            <Label htmlFor="name">User Name</Label>
            <Input type="text" id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Change User Password here  */}
          <div className="field my-2">
            <Label htmlFor="newPassword">User Password</Label>
            <Input type="text" id="newPassword" {...register("newPassword")} />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
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
