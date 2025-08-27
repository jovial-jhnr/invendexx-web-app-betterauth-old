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
import Spinner from "@/components/ui/spinner";

// const banUserSchema = z.object({
//   firstName: z.string(),
//   banReason: z.string(),
//   banExpiresIn: z.number().nullable(),
// });

export default function BanUserForm({ className, user, open, onSuccess }) {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;

  //   Todo: add createdby for password change

  // Store details from authClient.
  // const { data: activeOrganization } = authClient.useActiveOrganization();
  // const storeId = activeOrganization?.id;

  const banTime = [
    { label: "1 minute", value: 60 },
    { label: "1 hour", value: 60 * 60 },
    { label: "1 day", value: 60 * 60 * 24 },
    { label: "1 week", value: 60 * 60 * 24 * 7 },
    { label: "1 month (30d)", value: 60 * 60 * 24 * 30 },
    { label: "1 year (365 d)", value: 60 * 60 * 24 * 365 },
  ];

  // The user for registration
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: zodResolver(banUserSchema),
  });

  React.useEffect(() => {
    if (open && user) {
      reset({
        firstName: user?.firstName,
      });
    }
  }, [open, user, reset]);

  const onSubmit = async (data) => {
    const { banReason, banExpiresIn } = data;
    const { id: userId } = user;

    try {
      // Admin Check
      if (role !== "admin") {
        return toast.error("You are not allowed this action");
      }
      // Ban User function

      await authClient.admin.banUser(
        {
          userId,
          banReason, // Optional (if not provided, the default ban reason will be used - No reason)
          banExpiresIn: Number(banExpiresIn), // Optional (if not provided, the ban will never expire)
        },
        {
          onSuccess(ctx) {
            toast.success("Successfully banned User ");
          },
          onError(ctx) {
            toast.error("Failed to ban User ");
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

          <div className="grid gap-2 my-2">
            <Label htmlFor="banExpiresIn">Select Ban Period </Label>
            <Controller
              control={control}
              name="banExpiresIn"
              // rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange} // 👈 convert to number
                  value={field.value} // 👈 keep UI happy by converting number → string
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Ban Period">
                      {field.value || "Select ban period"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Country</SelectLabel>
                      {banTime?.map((option) => (
                        <SelectItem key={option?.value} value={option?.value}>
                          {option?.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Change ban Reason  here  */}
          <div className="field my-2">
            <Label htmlFor="banReason">Ban Reason</Label>
            <Textarea type="text" id="banReason" {...register("banReason")} />
            {errors.banReason && (
              <p className="text-red-500 text-sm">{errors.banReason.message}</p>
            )}
          </div>
          {/* Submit */}
          <div className="my-4 mx-3">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner /> "Banning User"
                </>
              ) : (
                "Ban User "
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
