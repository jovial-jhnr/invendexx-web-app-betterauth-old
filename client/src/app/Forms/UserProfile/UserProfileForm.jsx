import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FileUploader } from "@/components/file-uploader";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const userProfileSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  phoneNumber: z.string(),
});

export default function UserProfileForm({ className }) {
  // User data from authClient
  const { data: session } = authClient.useSession();

  // The user for registration
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: session?.user?.firstName,
      middleName: session?.user?.middleName,
      lastName: session?.user?.lastName,
      phoneNumber: session?.user?.phoneNumber,
    },
  });
  // const files = fil;

  const handleFilesReady = (files) => {
    console.log("Files ready:", files);
    return (
      <>
        <div>
          <Button>Upload Image</Button>
        </div>
      </>
    );
  };

  // Example: Create FormData to send to server
  // const formData = new FormData();
  // files.forEach((file, index) => {
  //   formData.append(`file-${index}`, file);
  // });
  // Send to server
  // fetch("/api/upload", { method: "POST", body: formData });

  const onSubmit = async (data) => {
    const { firstName, middleName, lastName, phoneNumber } = data;

    await authClient.updateUser(
      {
        firstName,
        middleName,
        lastName,
        phoneNumber,
      },
      {
        onSuccess(ctx) {
          toast.success("User updated successfully");
        },
      },
      {
        onError(ctx) {
          toast.error("Failed to update user profile");
        },
      }
    );
  };

  return (
    <>
      <form
        className={cn("grid gap-6", className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-section">
          <h1 className="m-3 text-xl">Profile Picture</h1>

          {/* Profile Picture */}
          <div className="field items-center">
            <Label htmlFor="file">Profile Picture</Label>
            <FileUploader
              maxFiles={1}
              maxSize={1024 * 1024 * 5} // 5MB
              accept={["image/*"]}
              onFilesReady={handleFilesReady}
              className="w-full  items-center "
              // Optional: Enable image cropping
              enableCropping={true}
              cropAspectRatio // Fixed aspect ratio (optional)
              cropMinWidth={100}
              cropMinHeight={56}
            />
          </div>

          <h1 className="m-3 text-xl">Personal Information</h1>

          {/* Name Fields */}
          <div className="grid  gap-4">
            <div className="field">
              <Label htmlFor="first-name">First Name</Label>
              <Input type="text" id="first-name" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="field">
              <Label htmlFor="middle-name">Middle Name</Label>
              <Input type="text" id="middle-name" {...register("middleName")} />
              {errors.middleName && (
                <p className="text-red-500 text-sm">
                  {errors.middleName.message}
                </p>
              )}
            </div>
            <div className="field">
              <Label htmlFor="last-name">Last Name</Label>
              <Input type="text" id="last-name" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact Info */}

          <div className="field">
            <Label htmlFor="phone">Phone Number</Label>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  defaultCountry="gh"
                  className="w-full"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Social Links
        <div className="grid md:grid-cols-2 gap-4">
          <div className="field">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input type="text" id="whatsapp" />
          </div>
          <div className="field">
            <Label htmlFor="instagram">Instagram</Label>
            <Input type="text" id="instagram" />
          </div>
          <div className="field">
            <Label htmlFor="twitter">Twitter (X)</Label>
            <Input type="text" id="twitter" />
          </div>
          <div className="field">
            <Label htmlFor="facebook">Facebook</Label>
            <Input type="text" id="facebook" />
          </div>
        </div>

        {/* Optional Description *
        <div className="field">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description") />
        </div> */}

          {/* Submit */}
          <div className="pt-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving Changes........." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
