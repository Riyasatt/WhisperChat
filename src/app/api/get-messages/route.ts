import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request:Request){

    await dbConnect();
    const session = await getServerSession(authOptions)
    const _user : User = session?.user as User

    if(!session || !_user){
        return Response.json({
            success : false,
            message : "not authenticated"
        }, {status : 401})
    }

    const userId = new mongoose.Types.ObjectId(_user._id);
    try {
        const user = await userModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } },
          ]).exec();

        if(!user){
            return Response.json({
                success : false,
                message : "user not found "
            }, {status : 404})
        }



        if(user.length === 0){
            return Response.json({
                success : true,
                message : "no messages yet"
            }, {status : 200})
        }
        
        return Response.json({
            messages : user[0].messages
        }, {status : 200})

    } catch (error) {
        // console.log(error)
         return Response.json({
            success : false,
            message : "error while getting messages"
        },{status : 500})
    }
}