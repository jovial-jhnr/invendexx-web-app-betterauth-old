import axios from "axios";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploader } from "@/components/file-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import backendUrl from "@/lib/backendUrl";

import {
  Select,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import Spinner from "@/components/ui/spinner";

/* Function to fetch all countries from the API and 
 return an array of country names sorted alphabetically */
const allCountries = async () => {
  try {
    const res = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    // console.log("All countries", res.data);
    return res.data
      .map((country) => country?.name?.common)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    throw error;
  }
};

function StoreSettingsFormV2({ className }) {
  // Get userId from useSession.
  const { data: session, isPending, error } = authClient.useSession();
  const ownerId = session?.user?.id;

  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  // Countries query to fetch all countries
  const { data: countries, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: allCountries,
  });

  const updateStoreSchema = z.object({
    name: z.string().min(0).optional().nullable(),
    slug: z.string().min(0).optional().nullable(),
    logo: z.any().optional(),
    banner: z.string().min(0).optional().nullable(),
    phoneNumber: z.string().min(0).optional().nullable(),
    email: z.string().optional().nullable(),
    website: z.string().min(0).optional().nullable(),
    description: z.string().min(0).optional().nullable(),
    country: z.string().min(0).optional().nullable(),
    address: z.string().min(0).optional().nullable(),
    state: z.string().min(0).optional().nullable(),
    region: z.string().min(0).optional().nullable(),
    zipCode: z.string().min(0).optional().nullable(),
    city: z.string().min(0).optional().nullable(),
    status: z.string().min(0).optional().nullable(),
    storeTag: z.string().min(0).optional().nullable(),
    whitelabel: z.string().min(0).optional().nullable(),
    facebook: z.string().min(0).optional().nullable(),
    instagram: z.string().min(0).optional().nullable(),
    tiktok: z.string().min(0).optional().nullable(),
    twitter: z.string().min(0).optional().nullable(),
    linkedin: z.string().min(0).optional().nullable(),
    currency: z.string().min(0).optional().nullable(),
    storeUrl: z.string().min(0).optional().nullable(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: {
      name: activeOrganization?.name,
      slug: activeOrganization?.slug,
      logo: activeOrganization?.logo,
      banner: activeOrganization?.banner,
      phoneNumber: activeOrganization?.phoneNumber,
      email: activeOrganization?.email,
      website: activeOrganization?.website,
      description: activeOrganization?.description,
      country: activeOrganization?.country,
      address: activeOrganization?.address,
      state: activeOrganization?.state,
      region: activeOrganization?.region,
      zipCode: activeOrganization?.zipCode,
      city: activeOrganization?.city,
      status: activeOrganization?.status,
      storeTag: activeOrganization?.storeTag,
      whitelabel: activeOrganization?.whitelabel,
      facebook: activeOrganization?.facebook,
      instagram: activeOrganization?.instagram,
      tiktok: activeOrganization?.tiktok,
      twitter: activeOrganization?.twitter,
      linkedin: activeOrganization?.linkedin,
      currency: activeOrganization?.currency,
      storeUrl: activeOrganization?.storeUrl,
    },
  });

  const onSubmit = async (data) => {
    // console.log("SUBMITTING DATA", data);
    try {
      const {
        name,
        slug,
        logo,
        banner,
        phoneNumber,
        email,
        website,
        description,
        country,
        address,
        state,
        region,
        zipCode,
        city,
        status,
        storeTag,
        whitelabel,
        facebook,
        instagram,
        tiktok,
        twitter,
        linkedin,
        currency,
        storeUrl,
      } = data;
      await backendUrl.post(
        `stores/store/${storeId}/settings/update-store-details`,
        {
          name,
          logo,
          slug,
          banner,
          phoneNumber,
          email,
          website,
          description,
          country,
          address,
          state,
          region,
          zipCode,
          city,
          status,
          storeTag,
          whitelabel,
          facebook,
          instagram,
          tiktok,
          twitter,
          linkedin,
          currency,
          storeUrl,
        }
      );
      toast.success("Store details updated successfully");
    } catch (error) {
      toast.error("Could not update store details");
    }
  };
  if (!activeOrganization) {
    return (
      <>
        <div>
          <Spinner />
        </div>
        <div>
          {toast.error("No active store available. Login again to set it up.")}
        </div>
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("grid gap-1", className)}
    >
      <div className="gap-2 my-2">
        <Label htmlFor="logo">Store Logo</Label>
        <FileUploader
          maxFiles={1}
          maxSize={1024 * 1024 * 5} // 5MB
          accept={["image/*"]}
          onFilesReady=""
          className="w-full  items-center "
          // Optional: Enable image cropping
          enableCropping={true}
          cropAspectRatio // Fixed aspect ratio (optional)
          cropMinWidth={100}
          cropMinHeight={56}
        />
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="name">Store Name</Label>
        <Input type="text" id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="banner">Banner</Label>
        <Input type="text" id="banner" {...register("banner")} />
        {errors.banner && (
          <p className="text-red-500 text-sm">{errors.banner.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <PhoneInput
              {...field}
              defaultCountry="gh"
              className="w-full"
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="website">Website</Label>
        <Input type="text" id="website" {...register("website")} />
        {errors.website && (
          <p className="text-red-500 text-sm">{errors.website.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="address">Address</Label>
        <Input type="text" id="address" {...register("address")} />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="region">Region</Label>
        <Input type="text" id="region" {...register("region")} />
        {errors.region && (
          <p className="text-red-500 text-sm">{errors.region.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="zipCode">Zip Code</Label>
        <Input type="text" id="zipCode" {...register("zipCode")} />
        {errors.zipCode && (
          <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="city">City</Label>
        <Input type="text" id="city" {...register("city")} />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="status">Status</Label>
        <Input type="text" id="status" {...register("status")} />
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="storeTag">Store Tag</Label>
        <Input type="text" id="storeTag" {...register("storeTag")} />
        {errors.storeTag && (
          <p className="text-red-500 text-sm">{errors.storeTag.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="storeUrl">Store URL</Label>
        <Input type="text" id="storeUrl" {...register("storeUrl")} />
        {errors.storeUrl && (
          <p className="text-red-500 text-sm">{errors.storeUrl.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="whitlabel">White Label</Label>
        <Input type="text" id="whitlabel" {...register("whitelabel")} />
        {errors.whitelabel && (
          <p className="text-red-500 text-sm">{errors.whitelabel.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="facebook">Facebook</Label>
        <Input type="text" id="facebook" {...register("facebook")} />
        {errors.facebook && (
          <p className="text-red-500 text-sm">{errors.facebook.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="instagram">Instagram</Label>
        <Input type="text" id="instagram" {...register("instagram")} />
        {errors.instagram && (
          <p className="text-red-500 text-sm">{errors.instagram.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="tiktok">TikTok</Label>
        <Input type="text" id="tiktok" {...register("tiktok")} />
        {errors.tiktok && (
          <p className="text-red-500 text-sm">{errors.tiktok.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="twitter">Twitter</Label>
        <Input type="text" id="twitter" {...register("twitter")} />
        {errors.twitter && (
          <p className="text-red-500 text-sm">{errors.twitter.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input type="text" id="linkedin" {...register("linkedin")} />
        {errors.linkedin && (
          <p className="text-red-500 text-sm">{errors.linkedin.message}</p>
        )}
      </div>
      <div className="grid gap-2 my-2">
        <Label htmlFor="country">Country</Label>
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
      {/* Select option For staff location type */}
      <div className="grid gap-2 my-2">
        <Label htmlFor="currency">Currency</Label>
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Currency">
                  {field.value || "Select country"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Currency</SelectLabel>
                  <SelectItem value="GHS">Ghana Cedis</SelectItem>
                  <SelectItem value="USD">US Dollars</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>{" "}
      <div className="grid gap-2 my-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          type="textarea"
          id="description"
          placeholder="Description on Store Here"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div className=" my-2 w-full">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default StoreSettingsFormV2;
