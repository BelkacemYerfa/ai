"use server"

import client from "@/lib/prisma-client"
import { Username } from "@prisma/client"




type Chat = {
  id: string;
  name: string;
  userId: string;
  messages: string[];
  username : Username
}

export async function createChat(chat : Pick<Chat , "name" | "userId" | "messages" | "username">) {

  const newChat = await client.chat.create({
    data: {
      name: chat.name,
      userId: chat.userId,
      messages: {
        create: chat.messages.map((message) => ({
          username : chat.username,
          content: message
        }))
      }
    },
  });
  return newChat;
}

export async function getChats(userId : string) {
  const chats = await client.chat.findMany({
    where : {
      userId,
    },
    select: {
      id: true,
      name: true,
    }
  });
  return chats;
}

export async function getChatId(credentials : Pick<Chat , "id" | "userId">) {
  const chat = await client.chat.findFirst({
    where : {
      id : credentials.id,
      userId : credentials.userId
    },
    select : {
      id : true,
      name : true,
      messages : {
        select : {
          id : true,
          username : true,
          content : true
        }
      }
    }
  });
  return chat;
}

export async function updateChatId(credentials : Pick<Chat , "id" |"userId" | "messages" | "username">) {
  const chat = await client.chat.update({
    where : {
      id : credentials.id,
      userId : credentials.userId
    },
    data : {
      messages : {
        create : credentials.messages.map((message)=>({
          username : credentials.username,
          content : message
        }))
      }
    }
  });
  return chat;
}

export async function deleteChat(credentials : Pick<Chat ,"id" |"userId">) {
  await client.message.deleteMany({
    where : {
      chatId : credentials.id
    }
  })
  await client.chat.delete({
    where : {
      id : credentials.id,
      userId : credentials.userId
    }
  });
}