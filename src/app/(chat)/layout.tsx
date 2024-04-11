import type { Metadata } from "next";
import { Sidebar } from "@/components/layouts/sidebar";



const chats = ["hey"  , "how" , "hey"  , "how" , "hey"  , "how" , "hey"  , "how" , "hey"  , "how" , "hey"  , "how",  "hey"  , "how" , "hey"  , "how" ]

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full" >
      <div className="relative min-w-64" >
        <Sidebar chats={chats} />
      </div>
      {children}
    </main>
  );
}
