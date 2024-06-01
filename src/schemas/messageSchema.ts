import {z} from "zod"

export const messageSchema = z.object({
    content : z.string().min(10,"the message should be at least 10 characters   ").max(300, "the message should not exceed 300 words")
})