import { Sidebar } from "@/components/layouts/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatForm } from "@/components/forms/chat-form";
import { Chat } from "@/components/chat";

type ChatIdProps = {
  params : {
    id : string
  }
}

const Chats = [{
  id : "1",
  message : "hello i'm a bot",
  username : "bot"
} ,{
  id : "2",
  message : "hello i'm a bob the human",
  username : "Bob2523"
} ,{
  id : "2",
  message : "hello i'm a bob the human",
  username : "Bob2523"
} ,{
  id : "2",
  message : "hello i'm a bob the human",
  username : "Bob2523"
},{
  id : "2",
  message : "hello i'm a bob the human",
  username : "Bob2523"
},{
  id : "2",
  message : "hello i'm a bob the human",
  username : "Bob2523"
},{
  id : "2",
  message : "hello i'm a bob the human",
  username : "Bob2523"
},{
  id : "2",
  message : "hello i'm a bob the human",
  username : "Bob2523"
}]

export default function ChatIdPage({params} : ChatIdProps) {
  console.log(params.id)
  return (
    <main className="relative w-full flex-1 flex flex-col ">
      <div className="relative flex flex-1 h-full overflow-auto max-h-full flex-col">
        <ScrollArea className="flex-1 h-full  " >
          <div className="flex-1 w-full h-full" >
            <Chat chats={Chats} />
          </div>
        </ScrollArea>
      </div>
      <div className="p-3" >
        <ChatForm />
      </div>
    </main>
  );
}
