import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  username : z.string().min(8),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;