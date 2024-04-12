"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UserButton, useUser } from "@clerk/nextjs"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import {  Bot, Delete, Menu, MessageSquareDot, Plus, Trash, Triangle } from "lucide-react"
import  Link  from "next/link"
import { usePathname } from "next/navigation"
import { useState, useTransition } from "react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { useRouter } from "next/navigation"
import { deleteChat } from "@/_actions/chat"

type SidebarProps = {
  chats?: {
    id : string ,
    name : string
  }[]
  setOpen?: (open : boolean)=>void
}

export const Sidebar = ({chats , setOpen }  : SidebarProps)=>{
  const router = useRouter()
  const {user} = useUser()
  const pathname = usePathname()
  const [isPending , startTransition] = useTransition();
  return (
    <aside className={cn(" flex h-full flex-col w-full bg-background text-left" , {
      "border-r max-w-64 inset-y fixed left-0 z-20" : !setOpen,
    })}>
        <div className="border-b p-2 flex gap-2 items-center">
          <Button variant="outline" size="icon" aria-label="Home">
            <Bot className="size-5 stroke-foreground" />
          </Button>
            <span className="text-xl font-semibold" > Boby </span>
        </div>
        <div className="px-2 pt-2 w-full" >
          <Link
            className={cn("rounded-lg h-8 !justify-start w-full gap-2" , buttonVariants({
              variant : "secondary"
            }))}
            aria-label="Playground"
            href={`/`}
            onClick={()=>{
              setOpen?.(false)
              router.refresh()
            }}
          >
            <Plus className="size-4" />
            Create new chat
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-2 flex-1 overflow-auto scrollbar-thin scrollbar-track-transparent  scrollbar-thumb-muted ">
          <h3 className="text-xs text-muted-foreground font-semibold " >Chats</h3>
          <ScrollArea className="flex-1 h-full " >
          <div className="flex-1 flex flex-col gap-1 items-start " >
            {chats && chats.length > 0 ? chats?.map((chat , i)=>{
              console.log(pathname === `/chat/${chat.id}` ? "default" : "ghost")
              return (
                <Button disabled={isPending} key={chat.id} variant={pathname === `/chat/${chat.id}` ? "default" : "ghost"} className={cn("rounded-lg h-8 !justify-between w-full gap-2 group disabled:opacity-50 " )}>
                <Link
                 className={cn("rounded-lg h-8 flex items-center !justify-start w-full gap-2 group disabled:opacity-50 ")}
                  aria-label="Playground"
                  href={`/chat/${chat.id}`}
                  onClick={()=>setOpen?.(false)}
                >
                    <MessageSquareDot className="size-4" />
                    <span>{chat.name}</span>
                </Link>
                <Trash className="size-4 hover:stroke-destructive" onClick={
                  ()=> {
                    startTransition(async()=>{
                      await deleteChat({
                        id : chat.id,
                        userId : user?.id as string
                      })
                    })
                    router.push("/")
                    router.refresh()
                  }
                }  />
                </Button>
              )
            }) : <div className="flex-1 h-full flex items-center justify-center" >
                <p>There is no chats currently</p>
              </div>}
          </div>
          </ScrollArea>
        </nav>
        <div className="px-2 pt-2 w-full" >
          <div className={cn("mb-2 left-3 gap-2 w-full !h-12" , buttonVariants({variant:"secondary"}) )}>
            <div className="size-8" >
              <UserButton />
            </div>
            <div className="flex flex-col space-y-0.5" >
              <p className="text-[13px]/[20px] capitalize font-medium" >{user?.username ?? user?.emailAddresses[0].emailAddress.split("@")[0] }</p>
              <span className="text-xs text-muted-foreground" >
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
          </div>
        </div>
      </aside>
  )
}



export const MobileMenu = ({chats} : SidebarProps)=>{
  const [open , setOpen] = useState(false);
  return (
    <div className="md:hidden ">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex items-center gap-2" >
          <span className="text-xs" >Open Menu</span>
          <Menu className="size-4" />
          <span className="sr-only">menu</span>
        </SheetTrigger>
        <SheetContent side={"right"} className="p-0" >
          <Sidebar setOpen={setOpen} chats={chats} />
        </SheetContent>
      </Sheet>
    </div>
  )
}