/* We are using the betterauth organization plugin as the store, user that signs up
//  is the owner(store owner), if you see store is the organization,and vis-a-vis.
*/
// src/auth/create-organization.jsx
import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import AuthPageLayout from "@/auth/auth-layout";
import { authClient } from "@/lib/auth-client";

const organizationSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),
  slug: z.string().min(3, "Store slug required. Egs. connet-store"),
  logo: z.string().optional(),
});

export function CreateOrganization({ className, ...props }) {
  const { data: session, error, refresh } = authClient.useSession();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async (data) => {
    const { name, slug, logo } = data;

    const slugCheck = await authClient.organization.checkSlug({
      slug: slug,
    });

    if (!slugCheck) {
      toast.error("Slug already in use. Change yours to something else");
      return true;
    } else {
      toast.success("Slug available to use");
    }

    await authClient.organization.create(
      {
        name: name,
        slug: slug,
        logo: logo,
      },
      {
        onSuccess(ctx) {
          toast.success("Organization created successfully!"),
            navigate("/storedashboard");
        },
        onError(ctx) {
          toast.error("Failed to create organization");
        },
      }
    );
  };

  return (
    <AuthPageLayout>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="hover:shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create Your Organization</CardTitle>
            <CardDescription>
              Complete your setup by adding organization details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Organization Name */}
              <div>
                <Label htmlFor="name">Store Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Egs. Connet Store"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Store Slug</Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  placeholder="Egs. connet-store"
                />
                {errors.slug && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              {/* <div>
                <Label htmlFor="logo">Store Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  {...register("logo")}
                  placeholder=""
                />
                {errors.logo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.logo.message}
                  </p>
                )}
              </div> */}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : "Complete Setup"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthPageLayout>
  );
}

export default CreateOrganization;

{
  /* Organization Type
              <div>
                <Label htmlFor="type">Organization Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="small_business">
                          Small Business
                        </SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="non_profit">Non-Profit</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div> */
}

{
  /* Industry (Optional)
              <div>
                <Label htmlFor="industry">Industry (Optional)</Label>
                <Input
                  id="industry"
                  {...register("industry")}
                  placeholder="e.g. Technology, Healthcare"
                />
              </div>

              {/* Organization Size (Optional) 
              <div>
                <Label htmlFor="size">Organization Size (Optional)</Label>
                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201-500 employees
                        </SelectItem>
                        <SelectItem value="501+">501+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div> */
}
