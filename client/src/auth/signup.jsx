import React from "react";
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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
// import backendUrl from "@/lib/backendUrl";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/ui/spinner";
import AuthPageLayout from "@/auth/auth-layout";
import { authClient } from "@/lib/auth-client";

// Zod Schema for validation
const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email("Invalid email"),
  phoneNumber: z
    .string()
    .min(9, "Phone number must be exactly 9 digits and start with +233"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function SignUp({ className, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    const { firstName, lastName, email, password, phoneNumber } = data;

    try {
      await authClient.signUp.email(
        {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        },
        {
          onRequest: (ctx) => {
            <Spinner />;
          },
          onSuccess: (ctx) => {
            toast.success("User signed up successfully!");
            navigate(`/verify-email?email=${email}`);
          },
          onError: (ctx, error) => {
            toast.error(
              error.response?.data?.message || "Internal server error"
            );
            console.log("Auth error", ctx.error.statusText);
          },
        }
      );

      // console.log("Response:", response.data);

      // window.location.href = "/create-store"; // Redirect to signin page
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <AuthPageLayout>
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <Card className="hover:shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>
              Sign Up with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 ">
                <div className="flex flex-col-3 gap-4">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91
                         1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 
                         1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 
                         1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 
                         1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 
                         2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 
                         1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 
                         1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Apple
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 
                        1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 
                        8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 
                        16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 
                        0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <div className="flex flex-row gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="text">First Name</Label>
                      <Input
                        id="first-name"
                        type="text"
                        {...register("firstName")}
                        placeholder="Anders"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="text">Last Name</Label>
                      <Input
                        id="last-name"
                        type="text"
                        {...register("lastName")}
                        placeholder="Wilson"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder=" Egs. users@gmail.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Phone Number</Label>
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

                  <div className=" relative grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Password"
                      className="pr-10"
                    />
                    <span
                      className="absolute right-3 top-1/3 cursor-pointer text-blue-500"
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
                    {isSubmitting ? "Signing Up...." : "Sign Up"}
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="underline text-blue-500 underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div
          className="text-balance text-center text-xs text-muted-foreground 
        [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary"
        >
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a>
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </AuthPageLayout>
  );
}
export default SignUp;
