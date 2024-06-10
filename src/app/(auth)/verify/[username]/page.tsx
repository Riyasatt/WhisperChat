'use client'

import React from 'react'
import * as z from 'zod'
import { verifySchema } from '@/schemas/verifySchema'
import { useToast } from '@/components/ui/use-toast'
import { useForm} from "react-hook-form"
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { apiResponse } from '@/types/apiResponse'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useTimeout } from 'usehooks-ts'

const page = () => {

    const router = useRouter();
    const params = useParams<{username : string}>()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver :zodResolver(verifySchema)
    })

    const onSubmit = async (data : z.infer<typeof verifySchema>)=>{
        try {
            const response = await axios.post('/api/verify-code',{
                username : params.username,
                code : data.code
            })
            toast({
                title : "success",
                description : response.data.message
            })

              router.replace('/sign-in')
            
        } catch (error) {
            console.log("error while handling submit" , error)
            const axiosError = error as AxiosError<apiResponse>
            toast({
                title: 'verification failed',
                description: axiosError.response?.data.message,
                variant : "destructive",
            })
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen ">
        <div className=" h-full max-w-lg w-full p-8 space-y-8 border rounded-2xl shadow-md">
            <div>
                <h1 className=" text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Verify Account
                </h1>
                <p className="mb-4">The verification Code is sent to your registered email</p>
            </div>
            <div >
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <Button className='bg-btn text-white' type="submit">Verify</Button>
      </form>
    </Form>
            </div>
        </div>
    </div>
  )
}

export default page