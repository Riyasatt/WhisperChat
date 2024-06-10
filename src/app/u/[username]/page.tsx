"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { apiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState("");

  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const pathname = usePathname();

  const username = pathname.substring(3);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<apiResponse>("/api/send-message", {
        username,
        content: data.content,
      });
      toast({
        title: "success",
        description: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: "error",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-28 flex flex-col justify-between container min-h-screen ">
      <div className=" font-extrabold text-5xl text-center">
        Public Profile Link
      </div>
      <div className="mt-14 flex flex-1 flex-col item justify-between ">
        <div >
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-xl">Send Anonymous Message to @{username}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here"
                      className="resize-none h-32 w-[80%] text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {isSubmitting ? (
                <Button disabled className="text-white bg-btn">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className=" bg-gradient-to-br bg-btn text-white">
                  Send It
                </Button>
              )}
            </div>
          </form>
        </Form>
        </div>
        <div className="flex ">
          <div>
            Want to get messages like this ?&nbsp; &nbsp; 
          </div>
          <Link href='/sign-up' className="text-blue-400 underline">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
