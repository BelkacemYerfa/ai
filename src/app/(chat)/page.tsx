import { ChatForm } from "@/components/forms/chat-form";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Bot } from "lucide-react";

export default async function Home() {
  const user = await currentUser()
  if(!user) redirect("/sign-in")
  return (
    <main className="relative w-full flex-1 gap-4 overflow-auto flex flex-col ">
      <div className="relative flex flex-1 h-full max-h-full flex-col rounded-xl py-4">
          <div className="flex-1 w-full h-full" >
            <div className="flex items-center justify-center h-full gap-2" >
              <div className="flex items-center gap-2" >
                <Bot className="size-24" />
                <div className="flex flex-col space-y-1" >
                  <span className="text-xl break-words max-w-72 " >Ask Boby</span>
                  <span className="text-sm text-muted-foreground" >Your financel advisor</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="p-3" >
        <ChatForm />
      </div>
    </main>
  );
}

