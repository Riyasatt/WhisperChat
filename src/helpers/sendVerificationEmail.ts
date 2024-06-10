// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/verificationEmail";
// import { apiResponse } from "@/types/apiResponse";

// export async function sendVerificationEmail(
//     email : string,
//     username : string,
//     verifyCode : string
// ):Promise<apiResponse>{
//     try {
//         await resend.emails.send({
//             from: 'onboarding@resend.dev',
//             to: email,
//             subject: 'HushHub | Verification Code',
//             react: VerificationEmail({username, otp : verifyCode})
//         })
//         return {success: true, message: "verification code sent"}

//     } catch (emailError) {
//         console.error("error while sending verification code",emailError);
//         return {success: false, message: "unable to send verification code"}
//     }
// }

// pages/api/send-email.js

import { apiResponse } from '@/types/apiResponse';
import nodemailer from 'nodemailer';

export  async function sendVerificationEmail(
    email :string, 
    username : string, 
    verifyCodeOtp :string
) :Promise<apiResponse> {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
            auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        await transporter.sendMail({
            from: "kriyasatali04@gmail.com", // Sender's email address
            to :email, // Recipient's email address
            subject : "Verification code for Whisper Chat", // Subject of the email
            text : `Hello this is the verification code for whisper chat`, // Plain text body
            html: `
            <p>Name: ${username}</p>
            <p>Email: ${email}</p>
            <p>Message:</p>
            <p>verification code : ${verifyCodeOtp}</p>
        `, // HTML body
        })

        return {success: true, message: "verification code sent"}
    }catch(error){
        console.error(error);
        return {success: false, message: "unable to send verification code"}
    }

        // Create a transporter using your email provider's SMTP settings
       
}
