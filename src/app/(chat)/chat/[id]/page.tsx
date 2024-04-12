import { Sidebar } from "@/components/layouts/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatForm } from "@/components/forms/chat-form";
import { Chat } from "@/components/chat";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type ChatIdProps = {
  params : {
    id : string
  }
}


export default async function ChatIdPage({params} : ChatIdProps) {
  const user = await currentUser()
  if(!user) redirect("/sign-in")
  return (
    <main className="relative w-full flex-1 flex flex-col ">
      <div className="relative flex flex-1 h-full overflow-auto max-h-full flex-col">
        <ScrollArea className="flex-1 h-full  " >
          <div className="flex-1 w-full h-full" >
            <Suspense fallback={<div className="flex items-center justify-center" >Loading ...</div>} >
              <Chat chatId={params.id} />
            </Suspense>
          </div>
        </ScrollArea>
      </div>
      <div className="p-3" >
        <ChatForm />
      </div>
    </main>
  );
}
