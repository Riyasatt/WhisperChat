import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {email, password, username} = await request.json()

        const existingUserVerifiedByUsername= await userModel.findOne({
            username,
            isVerified : true
        })

        if(existingUserVerifiedByUsername) {
            return Response.json({
                success : false
,                message : "username already exists"
            },{status:400})
        }

        const existingUserByEmail = await userModel.findOne({email})

        const verifyCodeOtp = Math.floor(100000 + Math.random() * 900000).toString()

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message:"user already exists with the email"
                },{status:500})
            }else{
                const hashedPassword = await bcrypt.hash(password,10)

                existingUserByEmail.username = username
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verificationCode = verifyCodeOtp
                existingUserByEmail.verificationCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()

            }
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+1)

            const newUser = new userModel({
                username,
                email,
                password : hashedPassword,
                isVerified: false,
                verificationCode : verifyCodeOtp,
                verificationCodeExpiry : expiryDate,
                isAcceptingMessage : true,
                messages : [],
            })

            await newUser.save()
        }
        const emailResponse= await sendVerificationEmail(email, username,verifyCodeOtp)

        if(!emailResponse.success){
            return Response.json({
                success:false,
                message : emailResponse.message
            },{status:500})
        }
        return Response.json({
            success : true,
            message : "user registered successfully. please verify your email"
        },{status:201})
    } catch (err) {
        console.error(err)
        return Response.json(
            {
                success : false,
                message :"error while registering user"
            },{
                status : 500,
            })
    }
}