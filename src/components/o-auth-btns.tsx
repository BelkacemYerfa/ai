"use client";

import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Icons } from "./icons";

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  /*  { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  { name: "Discord", strategy: "oauth_discord", icon: "discord" }, */
] satisfies {
  name: string;
  strategy: OAuthStrategy;
  icon: keyof typeof Icons;
}[];

export const OAuthSignIn = () => {
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState<string>("");
  const oauthSignIn = async (provider: OAuthStrategy) => {
    try {
      setIsLoading(provider);
      await signIn?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      setIsLoading("");
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col  w-full sm:flex-row gap-2">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];
        return (
          <Button
            key={provider.strategy}
            variant={"outline"}
            className="w-full bg-background flex gap-2"
            onClick={() => oauthSignIn(provider.strategy)}
          >
            {isLoading !== provider.strategy ? (
              <Icon className="h-4 w-4" />
            ) : (
              <Icons.Loader2 className="h-4 w-4 animate-spin" />
            )}
            {provider.name}
          </Button>
        );
      })}
    </div>
  );
};