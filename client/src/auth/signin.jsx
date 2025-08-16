import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import backendUrl from "@/lib/backendUrl.jsx";
import toast from "react-hot-toast";
import AuthPageLayout from "@/auth/auth-layout";
import { authClient } from "@/lib/auth-client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Zod Schema for validation
const signInSchema = z.object({
  email: z.email("Invalid email or wrong email typed"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// LoginForm component
export default function SignIn({ className, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  // Users active Store
  const { data: activeOrganization } = authClient.useActiveOrganization();

  const storeId = activeOrganization?.id;

  // The user's session to get their role.
  const { data: session, isPending, error, refresh } = authClient.useSession();

  // UserId from the session
  const userId = session?.user?.id;

  // User's Role from the session.
  const userRole = session?.user?.role;

  const Error = error;

  // Setting up the form with react-hook-form and zod for validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    const { email, password } = data;

    // Send the signin credentials to the backend with the CSRF Token
    const response = await authClient.signIn.email({
      email: email,
      password: password,
    });

    const userResponse = await backendUrl.get(
      "/api/auth/get-session",

      { withCredentials: true }
    );

    /* This fetches the user session data after login
      specifically, the user role */
    const userRole = userResponse.data?.user?.role;
    const storeId = userResponse?.data?.session?.activeOrganizationId;
    // Redirection logic based on user role

    if (userRole === "admin") {
      navigate("/syntaxdashboard");

      toast.success("💰💰Syntax Admin Logged in Successfully!💰💰");
    } else if (userRole === "app_member") {
      navigate("/syntaxdashboard");

      toast.success("🧨🧨Syntax Team Logged in Successfully!💰💰");
    } else if ((storeId && userRole === "owner") || userRole === "staff") {
      navigate("/storedashboard");

      toast.success("✅✅Store Logged in Successfully!✅✅");
    } else {
      toast.error("You need a store. Go and create one.");
      navigate("/create-store");
    }
  };

  // Google SignIn
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/verify-email",
    });
  };

  return (
    <AuthPageLayout>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="hover:shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col-3 gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleLogin}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147
                       1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 
                       8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 
                       16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0
                        6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Google
                  </Button>
                </div>

                <div
                  className="relative text-center text-sm after:absolute after:inset-0
                 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
                >
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="m@example.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid relative gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="ml-auto text-sm text-red-500 underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Password Here"
                      required
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
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging In...." : "Log In"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="underline text-blue-500 underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </AuthPageLayout>
  );
}
