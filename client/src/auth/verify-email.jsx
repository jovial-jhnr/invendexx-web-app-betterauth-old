import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import AuthPageLayout from "./auth-layout";

const verifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export function VerifyEmail({ className, ...props }) {
  const [params] = useSearchParams();
  const email = params.get("email");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data) => {
    const { otp, email } = data;

    // console.log("Submitting data:", data);

    await authClient.emailOtp.verifyEmail(
      {
        email: email,
        otp: otp,
      },
      {
        onSuccess: (ctx) => {
          toast.success("User email verification successful");
          navigate("/create-store");
        },
        onError: (ctx, error) => {
          toast.error("Failed to verify users email");
        },
      }
    );
  };

  return (
    <AuthPageLayout>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Yaay! You're joining us</CardTitle>
            <CardDescription>Type the OTP Codes in the box</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  {/* OTP verify section */}
                  <div className="grid gap-2">
                    {/* <Label htmlFor="email">Email</Label> */}
                    <Input
                      id="email"
                      type="hidden"
                      value={email}
                      {...register("email")}
                      // placeholder="m@example.com"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Controller
                      control={control}
                      name="otp"
                      render={({ field }) => (
                        <InputOTP
                          maxLength={6}
                          onChange={field.onChange}
                          value={field.value}
                          className=""
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="mr-2" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Codes"
                    )}
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
         [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  "
        >
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </AuthPageLayout>
  );
}

export default VerifyEmail;
