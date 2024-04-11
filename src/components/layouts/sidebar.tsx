"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UserButton, useUser } from "@clerk/nextjs"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import {  Bot, MessageSquareDot, Plus, Triangle } from "lucide-react"
import  Link  from "next/link"
import { usePathname } from "next/navigation"

type SidebarProps = {
  chats : string[]
}

export const Sidebar = ({chats} : SidebarProps)=>{
  const {user} = useUser()
  const pathname = usePathname()
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r max-w-64 w-full bg-background text-left">
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
          >
            <Plus className="size-4" />
            Create new chat
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-2 flex-1 overflow-auto scrollbar-thin scrollbar-track-transparent  scrollbar-thumb-muted ">
          <h3 className="text-xs text-muted-foreground font-semibold " >Chats</h3>
          <ScrollArea className="flex-1 h-full " >
          <div className="flex-1 flex flex-col gap-1 items-start " >
            {chats.map((chat , i)=>(
              <Link
                key={chat}
                className={cn("rounded-lg h-8 !justify-start w-full gap-2 " , buttonVariants({
                  variant : pathname === `/chat/${chat}` ? "default" : "ghost"
                }))}
                aria-label="Playground"
                href={`/chat/${chat}`}
              >
                <MessageSquareDot className="size-4" />
                {chat}
              </Link>
            ))}
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