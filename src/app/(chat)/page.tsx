import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatForm } from "@/components/forms/chat-form";
import { Chat } from "@/components/chat";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser()
  if(!user) redirect("/sign-in")
  return (
    <main className="relative w-full flex-1 gap-4 overflow-auto flex flex-col ">
      <div className="relative flex flex-1 h-full max-h-full flex-col rounded-xl py-4">
        <ScrollArea className="max-h-full h-full" >
          <div className="flex-1 w-full h-full" >
            <Chat chats={[{
              id : "1",
              message : "hello i'm a bot",
              username : "bot"
            } ,{
              id : "2",
              message : "hello i'm a bob the human",
              username : "Bob2523"
            } ]} />
          </div>
        </ScrollArea>
        {/** TODO : space for the chat messages */}
      </div>
      <div className="p-3" >
        <ChatForm />
      </div>
    </main>
  );
}
