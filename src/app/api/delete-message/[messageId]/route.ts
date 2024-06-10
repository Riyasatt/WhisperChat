import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { User } from "next-auth";


export async function DELETE(request:Request,{params}: {params : {messageId :string}}){
    const  messageId = params.messageId
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user : User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success : false,
            message : "not authenticated"
        }, {status : 401})
    }
    try {
        const updatedResult = await userModel.updateOne(
            {_id : user._id},
            {$pull : {messages : {_id : messageId}}}
        )

        if(updatedResult.modifiedCount == 0){
            return Response.json({
                success : false,
                message : "message not found or already deleted"
            },{status : 404})
        }

        return Response.json({
            success : true,
            message : "message deleted successfully"
        },{status : 200})

    } catch (error) {
        return Response.json({
            success : false,
            message : "error while deleting message"
        },{status : 500})
    }

    
}