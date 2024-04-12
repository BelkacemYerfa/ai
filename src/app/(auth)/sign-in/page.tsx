import { type Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { Shell } from "@/components/shell";

const SignIn =  dynamic(()=>import("@clerk/nextjs").then((mod)=>mod.SignIn) , {
  loading : ()=> <p>loading ...</p>
})

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function SignInPage() {
  const user = await currentUser();
  if (user) {
    redirect("/app");
  }
  return (
    <Shell className="max-w-lg" >
      <SignIn />
    </Shell>
  );
}