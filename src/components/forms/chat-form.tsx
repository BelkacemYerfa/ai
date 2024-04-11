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


export const ChatForm = ()=>{

  const [isPending , startTransition] = useTransition();
  const chatId = useParams()
  const form = useForm<chatSchemaType>({
    resolver : zodResolver(chatSchema),
    defaultValues : {
      chat : ""
    }
  })

  const onSubmit = (data : chatSchemaType)=>{
    startTransition(()=>{
      console.log(data)
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