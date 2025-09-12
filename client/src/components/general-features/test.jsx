"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

export const GeneratedForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const form = useForm();

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (formData) => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log(formData);
      setStep(0);
      reset();

      toast.success("Form successfully submitted");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                index <= step ? "bg-primary" : "bg-primary/30",
                index < step && "bg-primary"
              )}
            />
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5",
                  index < step ? "bg-primary" : "bg-primary/30"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Multi form</CardTitle>
          <CardDescription>Current step {step + 1}</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 0 && (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                <FormField
                  key="3iJysbSr"
                  control={control}
                  name="3iJysbSr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Egs. Anders"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  key="51Y1NcFD"
                  control={control}
                  name="51Y1NcFD"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Egs. Wilson"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  key="wwLR7ES3"
                  control={control}
                  name="wwLR7ES3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Egs. test@example.com"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  key="ouPZGFYR"
                  control={control}
                  name="ouPZGFYR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Egs. +233 240 000 000"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="font-medium"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="font-medium">
                    {step === 2 ? "Submit" : "Next"}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 1 && (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                <FormField
                  key="tdF8TfTk"
                  control={control}
                  name="tdF8TfTk"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Egs. Electrical Store"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  key="YIqZCG38"
                  control={control}
                  name="YIqZCG38"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" autoComplete="off" />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  key="ylkUhdX1"
                  control={control}
                  name="ylkUhdX1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" autoComplete="off" />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="font-medium"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="font-medium">
                    {step === 2 ? "Submit" : "Next"}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                <FormField
                  key="6BCNQxLc"
                  control={control}
                  name="6BCNQxLc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          placeholder="Egs. ****************"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="font-medium"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="font-medium">
                    {step === 2 ? "Submit" : "Next"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
