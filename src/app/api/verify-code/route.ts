import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";

export async function POST(request: Request){
    await dbConnect();
    try {
        
        const {username,code} =  await request.json();

        const decodedUser =decodeURIComponent(username)

        const user = await userModel.findOne({username : decodedUser});

        if(!user){
             return Response.json({
                success : false,
                message : "user not found"
            }, {status : 500})
        }

        const isCodeValid = user.verificationCode === code;
        const isCodeNotExpired = new Date(user.verificationCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            user.save();
             return Response.json({
                success : true,
                message : "account verified successfully"
            }, {status : 200})
        }else if(!isCodeNotExpired ){
            return Response.json({
                success : false,
                message : "the verification code has expired, please signup again."
            }, {status : 400})
        }else{
            return Response.json({
                success : false,
                message : "incorrect code. Please try again."
            }, {status : 400})
        }



    } catch (error) {
        console.error("Error while verifying...")
        return Response.json({
            success : false,
            message : "Error while verifying..."
        }, {status : 500})
    }
}