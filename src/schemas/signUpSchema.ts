import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(2, "username should have at least 2 characters")
    .max(20, " username should have at most 20 characters")

export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message:"please enter valid email"}),
    password : z.string().min(4,{message:"password must be at least 4 character"})
})