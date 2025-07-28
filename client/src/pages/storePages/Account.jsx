import React from "react";
import UserProfileModal from "@/app/Modal/UserProfileModal/UserProfileModal";
import DashboardCard from "@/components/ui/dashboard-card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import backendUrl from "@/lib/backendUrl.jsx";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Update Password Schema
const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

function Account() {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data) => {
    const { newPassword, currentPassword } = data;

    await authClient.changePassword(
      {
        newPassword,
        currentPassword,
        revokeOtherSessions: true, // revoke all other sessions the user is signed into
      },
      {
        onSuccess(ctx) {
          toast.success("Password changed  successfully");
        },
        onError(ctx) {
          toast.error(
            "User does not exist. Please sign up before updating password."
          );
        },
      }
    );
  };

  return (
    <>
      <div className="">
        <div className="ml-3">
          <h1 className="text-xl font-medium">Account Settings</h1>
          <p>Manage account settings </p>
        </div>

        {/* Account Settings Button */}
        <div className="text-end mr-2">
          <UserProfileModal />
        </div>

        <div className="m-3 md:m-12">
          <DashboardCard>
            <section className="m-2">User Avatar</section>
            <div className="flex justify-center">
              <Avatar className="rounded-full size-20">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User Avatar"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>

            <section className="m-2">Personal Information</section>

            <div className="text-start">
              <Label htmlFor="first-name">First Name</Label>
              <Input type="text" value={session?.user?.firstName} readOnly />
            </div>

            <div className="text-start">
              <Label htmlFor="middle-name">Middle Name</Label>
              <Input type="text" value={session?.user?.middleName} readOnly />
            </div>

            <div className="text-start">
              <Label htmlFor="last-name">Last Name</Label>
              <Input type="text" value={session?.user?.lastName} readOnly />
            </div>

            <div className="text-start">
              <Label htmlFor="email">Email</Label>
              <Input type="email" value={session?.user?.email} readOnly />
            </div>

            <div className="text-start">
              <Label htmlFor="number">Phone Number</Label>
              <Input type="text" value={session?.user?.phoneNumber} />
            </div>
          </DashboardCard>
        </div>

        {/* Password Change Section */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-3 md:m-12">
            <DashboardCard>
              <section>Change Password</section>

              <div className="text-start mb-2 font-medium relative grid gap-2">
                <Label htmlFor="currentPassword" className="text-red-400">
                  Current Password
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("currentPassword")}
                  placeholder="Current Password"
                  className="pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 cursor-pointer text-blue-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="text-start font-medium mb-2 relative grid gap-2">
                <Label htmlFor="password" className="text-red-400">
                  New Password
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="New Password"
                  className="pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 cursor-pointer text-blue-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="m-3 max-w-full">
                <Button type="submit">Save Changes</Button>
              </div>
            </DashboardCard>
          </div>
        </form>
      </div>
    </>
  );
}

export default Account;
