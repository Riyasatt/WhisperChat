import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Mail } from "lucide-react";

export default function Home() {

  const messages = [
    {
      "title": "Message from User123",
      "content": "Loved your enthusiasm! You made me sleep.",
      "received": "10 minutes ago"
    },
    {
      "title": "Message from SecretAdmirer",
      "content": "I really liked your recent post!",
      "received": "2 hours ago"
    },
    {
      "title": "Message from MysteryGuest",
      "content": "Your speech was so engaging, even the plants in the room perked up.?",
      "received": "1 day ago"
    },
    {
      "title": "Message from User123",
      "content": "Hey, Great job leading the meeting! You kept it on track like a train on a good day.",
      "received": "10 minutes ago"
    },
    {
      "title": "Message from User123",
      "content": "Loved your enthusiasm! You made me sleep.",
      "received": "10 minutes ago"
    },
  ]
  return (
    <main className="bg-bg min-h-screen bg-cover overflow-hidden  ">
      <div className="container mt-20 mb-10">
        <div className="text-4xl md:text-5xl lg:text-7xl font-extrabold font mb-3 -98">
        <span className="text-blue-500">DIVE </span> into th world of <div className="text-blue-500"> Asli Feedback </div>
        </div>
        <div className=" text-white/60 text-xl mb-24">
          A App where you can send feedback anonymously
        </div>
        <div className=" ">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="flex">
          {messages.map((message :any, index: any) => (
              <CarouselItem key={index} className="p-4  md:basis-1/2">
                <Card className="md:p-3">
                  <CardHeader>
                    <CardTitle className=" text-md md:text-2xl">{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start ">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))} 
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        </div>
      </div>
    </main>
  );
}
