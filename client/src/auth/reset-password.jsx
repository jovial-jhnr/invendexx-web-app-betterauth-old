import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Spinner from "@/components/ui/spinner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthPageLayout from "@/auth/auth-layout";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password is needed and should be correct"),
  confirmpassword: z
    .string()
    .min(8, "Confirmed password is needed and should match Password"),
});

export default function ResetPassword({ className, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const token = new URLSearchParams(window.location.search).get("token");
  if (!token) {
    // Handle the error
    toast.error("Reset token not available or found. Try password reset again");
  }

  const onSubmit = async (data) => {
    const { password, confirmpassword } = data;

    await authClient.resetPassword({
      password,
      confirmpassword,
      token,
    });
  };

  return (
    <AuthPageLayout>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">
              Yay! We're getting Account back
            </CardTitle>
            <CardDescription>
              Simply input your password to confirm to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 ">
                <div className="grid gap-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    {...register("password")}
                  />
                  <span
                    className="absolute right-3 top-1/2 cursor-pointer text-blue-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2 relative">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    {...register("confirmpassword")}
                  />
                  <span
                    className="absolute right-3 top-1/2 cursor-pointer text-blue-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>

                  {errors.confirmpassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmpassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Spinner /> : "Reset Password"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="underline text-blue-500 underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </AuthPageLayout>
  );
}
