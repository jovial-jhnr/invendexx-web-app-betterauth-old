import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import useCountry from "@/hooks/storeHooks/use-country";

const editLocationSchema = z.object({
  name: z.string(),
  city: z.string(),
  region: z.string(),
  address: z.string(),
  country: z.string(),
  description: z.string(),
});

// Use form

export default function EditLocationForm({ className }) {
  // Get stor details from authClient
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  // Get all users here
  // const { data: countries, isLoading } = useCountry();

  if (isLoading) return <p>Loading countries...</p>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editLocationSchema),
  });

  const onSubmit = async (data) => {
    const { name, address, city, region, country } = data;
    const res = await backendUrl.post(
      `/stores/store/${storeId}/locations/${locationId}/update-location`,
      { name, address, city, region, country }
    );
  };

  return (
    <form
      className={cn("grid gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-section">
        {/* Name Fields */}

        <div className="field">
          <Label htmlFor="location-name">Location Name</Label>
          <Input type="text" id="location-name" {...register("name")} />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="field my-2">
          <Label htmlFor="address">Address</Label>
          <Input type="text" id="address" {...register("address")} />
        </div>

        <div className="field">
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" {...register("city")} />
        </div>
        <div className="field">
          <Label htmlFor="region">Region</Label>
          <Input type="text" id="region" {...register("region")} />
        </div>

        <div className="grid gap-2 my-2">
          <Label htmlFor="location">Select Country</Label>
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

        {/* Optional Description */}
        <div className="field">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>

        {/* Submit */}
        <div className="pt-3">
          <Button disabled={isSubmitting} className="w-full ">
            {isSubmitting ? "Saving Changes........." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
