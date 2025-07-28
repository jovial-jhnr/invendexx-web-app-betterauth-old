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

const editLocationSchema = z.object({
  name: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  description: z.string(),
});

/* Function to fetch all countries from the API and 
 return an array of country names sorted alphabetically */
const allCountries = async () => {
  const res = await axios.get("https://restcountries.com/v3.1/all?fields=name");
  return res.data
    .map((country) => country.name.common)
    .sort((a, b) => a.localeCompare(b));
};

// Use form

export default function EditLocationForm({ className }) {
  // Get stor details from authClient
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  // Get all users here
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: allCountries,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editLocationSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    const [_key, storeId] = queryKey;
    const res = await backendUrl.post(
      `stores/store/${storeId}/update-location`
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
        <div className="field">
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" {...register("city")} />
        </div>
        <div className="field">
          <Label htmlFor="region">Region</Label>
          <Input type="text" id="region" {...register("region")} />
        </div>

        <div className="grid gap-2">
          <Controller />
          <Label htmlFor="location">Select Country</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Country" />
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
        </div>

        {/* Optional Description */}
        <div className="field">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>

        {/* Submit */}
        <div className="pt-3">
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Saving Changes........." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
