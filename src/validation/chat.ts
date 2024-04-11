import { z} from "zod"

export const chatSchema = z.object({
  chat : z.string().min(1 , {
    message : "at least some text"
  }).max(500 , {
    message : "that's is a lot don't you think"
  })
})

export type chatSchemaType = z.infer<typeof chatSchema >