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
import useCountry from "@/hooks/storeHooks/use-country";
import { generate, count } from "random-words";
import {
  Select,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import AuthPageLayout from "@/auth/auth-layout";
import { authClient } from "@/lib/auth-client";

const organizationSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),
  slug: z.string().min(3, "Store slug required. Egs. connet-store"),
  logo: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  storeUrl: z.string().optional(),
  businessCategory: z.string().optional().nullable(),
});

// ====MAIN CREATE STORE FUNCTION====
export default function CreateStore({ className, ...props }) {
  const { data: session, error, refresh } = authClient.useSession();

  // Countries from the useCountry hook
  const { data: countries } = useCountry();

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
    // All data to submit
    const { name, slug, logo, country } = data;

    // Auto generate storeUrl to add to data
    const storeUrl = generate({ exactly: 1, join: "" }).toLowerCase();

    // Check if store slug is available to use
    const slugCheck = await authClient.organization.checkSlug({
      slug: slug,
    });

    if (!slugCheck) {
      toast.error("Slug already in use. Change yours to something else");
      return;
    } else {
      toast.success("Slug available to use");
    }

    await authClient.organization.create(
      {
        name,
        slug,
        logo,
        storeUrl,
        country,
        businessCategory,
      },
      {
        onSuccess(ctx) {
          toast.success("Organization created successfully!");
          navigate("/signin");
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
                <Label htmlFor="storeUrl">Store Url</Label>
                <Input
                  id="storeUrl"
                  type="text"
                  {...register("storeUrl")}
                  placeholder="Egs. conner-store"
                />
                {errors.storeUrl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.storeUrl.message}
                  </p>
                )}
              </div> */}

              {/* Business Type */}
              <div>
                <Label htmlFor="location">Business Category</Label>
                <Controller
                  control={control}
                  name="businessCategory"
                  // rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Business Category">
                          {field.value || "Select Business Category"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Business Type</SelectLabel>
                          <SelectItem value="Electronics & Gadgets">
                            Electronics & Gadgets
                          </SelectItem>
                          <SelectItem value="Fashion & Apparel">
                            Fashion & Apparel
                          </SelectItem>
                          <SelectItem value="Food & Groceries">
                            Food & Groceries
                          </SelectItem>
                          <SelectItem value="Jewelries & Accessories">
                            Jewelries & Accessories
                          </SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2 my-2">
                <Label htmlFor="country"> Country</Label>
                <Controller
                  control={control}
                  name="country"
                  // rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Country">
                          {field.value || "Select country"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Country</SelectLabel>
                          {countries?.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
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
