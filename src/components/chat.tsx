import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";


type ChatProps = {
  chats :  {
    id : string ;
    username: string;
    message : string
  }[]
}

export const Chat = ({chats} : ChatProps) =>{
  return chats.map((chat)=>{
    return <div key={chat.id} className={cn( chat.username === "bot" ? "" : "bg-muted")}  >
      <div className={cn("flex gap-2 text-sm px-2 py-4 max-w-2xl mx-auto" )} >
        {chat.username === "bot" ? (
            <>
              <div className="size-8 ring-muted-foreground ring-1 flex items-center justify-center rounded-md" >
                <Bot className="size-4"  />
              </div>
              <p>{chat.message}</p>
            </>
        ) : (
            <>
              <div className="size-8 ring-muted-foreground bg-background ring-1 flex items-center justify-center rounded-md" >
                <User className="size-4"  />
              </div>
              <p>{chat.message}</p>
            </>
        )}
      </div>
    </div>
  })

}