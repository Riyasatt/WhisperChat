import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request){
    await dbConnect();

    const session = await getServerSession(authOptions)

    const user : User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success : false,
            message : "not authenticated"
        }, {status : 401})
    }

    const userId = user._id;
    const {acceptMessages} = await request.json()

    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, 
            { isAcceptingMessage: acceptMessages},
            {new : true}
        )

        if(!updatedUser){
            return Response.json({
                success : false,
                message : "failed to update the message acceptance status"
            },{status : 500})
        }

        return Response.json({
            success : true,
            message : "message acceptance status updated successfully",
            updatedUser
        },{status : 200})
        
    } catch (error) {
        return Response.json({
            success : false,
            message : "failed to update user status"
        },{status : 500})
    }


}

export async function GET(request : Request){
    await dbConnect();

    const session = await getServerSession(authOptions)

    const user : User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success : false,
            message : "not authenticated"
        }, {status : 401})
    }

    const userId = user._id;

    try {
        const foundUser =   userModel.findById(userId)
        if(!foundUser){
            return Response.json({
                success : false,
                message : "user not found"
            },{status : 404})
        }
    
        return Response.json({
            success : true,
            message : "message accepting checked"
        },{status : 200})
    } catch (error) {
        return Response.json({
            success : false,
            message : "failed to get user status"
        },{status : 500})
    }
}