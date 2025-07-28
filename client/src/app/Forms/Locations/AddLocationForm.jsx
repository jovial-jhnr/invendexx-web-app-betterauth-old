import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  Select,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* Function to fetch all countries from the API and 
 return an array of country names sorted alphabetically */
const allCountries = async () => {
  const res = await axios.get("https://restcountries.com/v3.1/all?fields=name");
  return res.data
    .map((country) => country.name.common)
    .sort((a, b) => a.localeCompare(b));
};

export default function AddLocationForm({ className }) {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: allCountries,
  });

  return (
    <form className={cn("grid gap-6", className)}>
      <div className="form-section">
        {/* Name Fields */}
        <div className="grid gap-4">
          <div className="field">
            <Label htmlFor="location-name">Location Name</Label>
            <Input type="text" id="location-name" />
          </div>
          <div className="field">
            <Label htmlFor="city">City</Label>
            <Input type="text" id="city" />
          </div>
          <div className="field">
            <Label htmlFor="region">Region</Label>
            <Input type="text" id="region" />
          </div>
        </div>

        <div className="grid gap-2">
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
          <Textarea id="description" />
        </div>

        {/* Submit */}
        <div className="pt-3 w-full">
          <Button>Save Changes</Button>
        </div>
      </div>
    </form>
  );
}
