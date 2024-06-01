import mongoose,{Schema, Document} from "mongoose";
import { detectConflictingPaths } from "next/dist/build/utils";

export interface Message extends Document {
    content : string
    createdAt : Date
}

const messageSchema : Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username : string,
    email : string,
    password : string,
    isVerified: boolean,
    verificationCode : string,
    verificationCodeExpiry : Date,
    isAcceptingMessage : boolean,
    messages : Message[],
}

const userSchema : Schema<User> = new Schema({
    username :{
        type: String,
        required: [true,"Username is Required"],
        trim:true,
        unique: true

    },
    email :{
        type: String,
        required: [true,"Email is Required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Enter a valid gmail"]

    },
    password :{
        type: String,
        required: [true,"Password is Required"],
    },
    isVerified :{
        type: Boolean,
        default: false,
    },
    verificationCode :{
        type: String,
        required: [true,"Verification Code is Required"],
    },
    verificationCodeExpiry :{
        type: Date,
        required: [true,"Verification Code Expiry is Required"],
    },
    isAcceptingMessage :{
        type: Boolean,
        default: true,
    }, 
    messages :{
        type: [messageSchema],
    },
})

const userModel = (
        mongoose.models.User as mongoose.Model<User>
    ) || 
    ( 
        mongoose.model<User>("User", userSchema)
    )

export default userModel