'use client'

import { useForm} from "react-hook-form"
import  {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from "axios"
import { apiResponse } from "@/types/apiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const page = () => {

  const [username,setUsername] = useState('')
  const [usernameMessage,setUsernameMessage] = useState('')
  const [ isCheckingUsername,setIsCheckingUsername] = useState(false)
  const [ isSubmitting,setIsSubmitting] = useState(false)

  const debounce = useDebounceCallback(setUsername,500)
  const { toast } = useToast()
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver : zodResolver(signUpSchema),
    defaultValues: {
      username :"",
      email :  "",
      password : "",
    } 
  })

  useEffect(() =>{
    const checkUsernameUnique = async () =>{
      if(username){
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<apiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? "error while checking username")
        }finally{
          setIsCheckingUsername(false)
        }
      }
        


    }
    checkUsernameUnique()

  },[username])
  
  const onSubmit = async (data : z.infer<typeof signUpSchema>) =>{
    setIsSubmitting(true);
    try{
      const response = await axios.post('/api/sign-up',data)
      toast({
        title: 'success',
        description : response.data.message
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    }catch(error){
      const axiosError = error as AxiosError<apiResponse>
      toast({
        title: 'sign up failed',
        description: axiosError.response?.data.message,
        variant : "destructive",
      })
      setIsSubmitting(false)
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" h-full max-w-lg p-8 space-y-8 border  rounded-2xl shadow-md">
        <div className="text-center">
          <h1 className=" text-4xl px-10 font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Whisper Chat
          </h1>
          <p className="mb-4">Sign up to get start the adventure</p>
        </div>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className="py-6" placeholder="username" 
                    {...field} 
                    onChange={(e)=>{
                      field.onChange(e);
                      debounce(e.target.value);
                    }}
                  />
                  </FormControl>
                  
                  <p className={`text-sm ${usernameMessage === "username is available." ? " text-green-500" : " text-red-600"}`}> {usernameMessage}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="py-6" type="email" placeholder="email" 
                    {...field} 
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className="py-6" type="password" placeholder="password" 
                    {...field} 
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-btn text-white" disabled = {isSubmitting}>
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
              <p>
                Already a member{' '}
                <Link href="/sign-in" className=" text-blue-600 hover:text-purple-600 ">
                  Sign In
                </Link>
              </p>
        </div>
      </div>
    </div>
  )
}

export default page