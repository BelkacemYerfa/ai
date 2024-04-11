"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchemaType, SignUpSchema } from "@/validation/auth";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { Icons } from "@/components/icons";
import { PasswordInput } from "@/components/Password-input";

export const SignUpForm = () => {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username : "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: SignUpSchemaType) => {
    if (!isLoaded) return;
    startTransition(async () => {
      const { email, password , username } = data;
      try {
        await signUp.create({
           username,
          emailAddress: email,
          password,
        });
        console.log(data)
        toast.message("Check your email", {
          description: "Well hello",
        });
      } catch (error) {
        toast.error("Something went wrong , try again later");
      }
    });
  };
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="rounded-lg"
                  placeholder="John doe"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="rounded-lg"
                  placeholder="ex@exe.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  className="rounded-lg"
                  placeholder="*******"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-lg  disabled:cursor-not-allowed flex items-center gap-x-2 "
          disabled={isPending || !form.formState.isValid}
        >
          {isPending && (
            <Icons.Loader2
              className="h-5 w-5 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign Up
        </Button>
      </form>
    </Form>
  );
};