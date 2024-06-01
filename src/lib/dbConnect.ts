import mongoose from "mongoose";

type ConnectionObject = {
    isConnected? : number;
}

const connection:ConnectionObject = {}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("already connected to database");
        return;
    }

    try{
        const db = await mongoose.connect(process.env.MONGO_URI || "")

        //returns is the db is ready or not
        connection.isConnected = db.connections[0].readyState

    } catch(err){
        console.log("DB Connection failed",err);
        process.exit();
        
    }
}


export default dbConnect