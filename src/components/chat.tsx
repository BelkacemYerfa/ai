import { getChatId } from "@/_actions/chat";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { Bot, User } from "lucide-react";
import { Username } from "@prisma/client";
import { notFound } from "next/navigation";


type ChatProps = {
  chatId: string
}

export const Chat = async({chatId} : ChatProps) =>{
  const user = await currentUser()
  const chats = await getChatId(
   { id : chatId,
    userId : user?.id as string}
  )
  if(!chats?.id) notFound()
  return chats?.messages.map((chat)=>{
    return <div key={chat.id} className={cn( chat.username === Username.BOT ? "" : "bg-muted")}  >
      <div className={cn("flex gap-2 text-sm px-2 py-4 max-w-2xl mx-auto" )} >
        {chat.username === Username.BOT ? (
            <>
              <div className="size-8 ring-muted-foreground ring-1 flex items-center justify-center rounded-md" >
                <Bot className="size-4"  />
              </div>
              <p>{chat.content}</p>
            </>
        ) : (
            <>
              <div className="size-8 ring-muted-foreground bg-background ring-1 flex items-center justify-center rounded-md" >
                <User className="size-4"  />
              </div>
              <p>{chat.content}</p>
            </>
        )}
      </div>
    </div>
  })

}