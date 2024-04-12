import { type Metadata } from "next"
import { currentUser, SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for an account",
};

export default async function SignUpPage() {
  const user = await currentUser();
  if (user) {
    redirect("/app");
  }
  return (
    <Shell className="max-w-lg" >
      <SignUp />
    </Shell>
  );
}