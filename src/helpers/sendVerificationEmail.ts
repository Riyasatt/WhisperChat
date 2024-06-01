import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { apiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
):Promise<apiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'HushHub | Verification Code',
            react: VerificationEmail({username, otp : verifyCode})
        })
        return {success: true, message: "verification code sent"}

    } catch (emailError) {
        console.error("error while sending verification code",emailError);
        return {success: false, message: "unable to send verification code"}
    }
}
