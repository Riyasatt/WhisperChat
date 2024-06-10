'use client';

import { useForm} from "react-hook-form"
import  {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { signInSchema } from "@/schemas/signInSchema"
import { useToast } from "@/components/ui/use-toast"

const Page = () => {

  
  const [ isSubmitting,setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver : zodResolver(signInSchema),
    defaultValues: {
      identifier :"",
      password : "",
    } 
  })

 
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });


    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }
    setIsSubmitting(false)

    if (result?.url) {
      router.replace('/dashboard');
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen 0  bg-opacity-25">
      <div className=" h-full max-w-lg p-8 space-y-8 border rounded-2xl shadow-md">
        <div className="text-center">
          <h1 className=" text-4xl px-10 font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to Whisper Chat
          </h1>
          <p className="mb-4">Sign In to get start the adventure</p>
        </div>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input className="py-6"  placeholder="email/username" 
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
                    <Input  className="py-6" type="password" placeholder="password" 
                    {...field} 
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-btn text-white" disabled = {isSubmitting}>
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
              <p>
                Not a member{' '}
                <Link href="/sign-up" className=" text-blue-600 hover:text-blue-800">
                  Sign Up
                </Link>
              </p>
        </div>
      </div>
    </div>
  )
}

export default Page