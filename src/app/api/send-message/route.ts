import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request :Request){
    await dbConnect();
    const {username, content} = await request.json();

    try {
        const user = await userModel.findOne({username});

        if(!user){
            return Response.json({
                success : false,
                message : "user not found"
            }, {status : 404})
        }

        // is user accepting the messages
        if(!user.isAcceptingMessages){
            return Response.json({
                success : false,
                message : "user not accepting messages"
            }, {status : 403})
        }

        const newMessage = {content,createdAt : new Date()}

        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json({
            success : true,
            message : "message sent successfully"
        }, {status : 200})
    } catch (error) {
        console.error("Username checking gone wrong...",error)
        return Response.json({
            success : false,
            message : "error while sending message"
        }, {status : 500})
    }
}