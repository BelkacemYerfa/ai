import type { Metadata } from "next";
import { MobileMenu, Sidebar } from "@/components/layouts/sidebar";
import { getChats } from "@/_actions/chat";
import { currentUser } from "@clerk/nextjs";





export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser()
  const chats = await getChats(user?.id as string)
  return (
    <main className="flex h-screen w-full" >
      <div className="hidden md:block relative min-w-64" >
        <Sidebar chats={chats} />
      </div>
      <div className="inset-y fixed right-0 z-20 flex h-full flex-col text-left p-2 " >
        <MobileMenu chats={chats} />
      </div>
      {children}
    </main>
  );
}
