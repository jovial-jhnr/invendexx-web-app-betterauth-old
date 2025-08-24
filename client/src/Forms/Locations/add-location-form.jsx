import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";
import backendUrl from "@/lib/backendUrl";
import { useForm, Controller } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import useCountry from "@/hooks/storeHooks/use-country";

import {
  Select,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// MAIN FUNCTION
export default function AddLocationForm({ className }) {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // defaultValues: {
    //   name,
    //   address,
    //   city,
    //   region,
    //   country,
    // },
  });

  // Submit to create new location(store branch)
  const onSubmit = async (data) => {
    const { name, address, city, region, country } = data;

    try {
      await backendUrl.post(`/stores/store/${storeId}/create-location`, {
        name,
        address,
        city,
        region,
        country,
      });
      toast.success("New location added successfully");
    } catch (error) {
      toast.error("Failed to add location");
    }
  };

  // Query to get all countries
  const { data: countries } = useCountry();

  return (
    <form
      className={cn("grid gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-section">
        {/* Name Fields */}

        <div className="field my-2">
          <Label htmlFor="location-name">Location Name</Label>
          <Input type="text" id="location-name" {...register("name")} />
        </div>

        <div className="field my-2">
          <Label htmlFor="address">Address</Label>
          <Input type="text" id="address" {...register("address")} />
        </div>

        <div className="field my-2">
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" {...register("city")} />
        </div>

        <div className="field my-2">
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
        {/* <div className="field ">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...(register = "description")} />
        </div> */}

        {/* Submit */}
        <div className="pt-3 w-full my-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving Changes.... 😁😁" : "Save Changes 😁😁"}
          </Button>
        </div>
      </div>
    </form>
  );
}
