"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { chatSchema , chatSchemaType } from "@/validation/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CornerDownLeft } from "lucide-react";
import { useTransition } from "react";
import { Icons } from "../icons";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { updateChatId , createChat } from "@/_actions/chat";
import { useUser } from "@clerk/nextjs";
import { Username } from "@prisma/client";
import { useRouter } from "next/navigation";
import { parseInput } from "@/lib/input-formatter";
import axios from "axios"

const URL = "http://127.0.0.1:8000/"

export const ChatForm = ()=>{
  const {user} = useUser()
  const router = useRouter()
  const [isPending , startTransition] = useTransition();
  const params = useParams()
  const form = useForm<chatSchemaType>({
    resolver : zodResolver(chatSchema),
    defaultValues : {
      chat : ""
    }
  })

  const onSubmit =  (data : chatSchemaType)=>{
    startTransition(async ()=>{
      try {
        if(params.id) {
         await updateChatId({
            username : Username.HUMAN,
            id : params.id as string,
            messages : [data.chat],
            userId : user?.id as string
          })
          const message = parseInput(data.chat)
          const res = await fetch(URL , {
            method : "POST",
            headers : {
              "Content-Type" :"application/json",
              "X-CSRFToken" : "0KGGnjP94sGorvdmvmbtpQNDaPOz8SJc"
            },
            body : JSON.stringify(message)
          }).then((res)=>res.json())
          if(res.message) {
            await updateChatId({
              username : Username.BOT,
              id : params.id as string,
              messages : [res.message],
              userId : user?.id as string
            })
          }
          router.refresh()
        } else {
          const newChat = await createChat({
            username : Username.HUMAN,
            name : "Chat",
            messages : [data.chat],
            userId : user?.id as string
          })
          const message = parseInput(data.chat)
          const res = await fetch(URL , {
            method : "POST",
            headers : {
              "Content-Type" :"application/json",
              "X-CSRFToken" : "0KGGnjP94sGorvdmvmbtpQNDaPOz8SJc"
            },
            body : JSON.stringify(message)
          }).then((res)=>res.json())
          if(res.message) {
            await updateChatId({
              username : Username.BOT,
              id : newChat.id as string,
              messages : [res.message],
              userId : user?.id as string
            })
          }
          router.push(`/chat/${newChat.id}`)
          router.refresh()
        }
        form.reset()
      } catch (error) {
        toast.error("Something went wrong")
      }
    })
  }
  return (
    <Form {...form} >
      <form
          className=" w-full bottom-3 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          onSubmit={form.handleSubmit(onSubmit , (err)=> {
            toast.error(err.chat?.message)
          })}
        >
          <FormField  name="chat" render={({field})=>(
            <FormControl>
              <FormItem className="p-3" >
                <div className="px-3" >
                  <FormMessage />
                </div>
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-10 resize-none max-w-full border-0 shadow-none focus-visible:ring-0"
                  {...field}
                />
                <div className="flex items-center p-3 pt-0">
                  <Button disabled={isPending} type="submit" size="sm" className="ml-auto gap-1.5 disabled:opacity-50 ">
                    {isPending && <Icons.Loader2 className="size-4 animate-spin " /> }
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>

              </FormItem>
            </FormControl>
          )} />
        </form>

    </Form>
  )
}