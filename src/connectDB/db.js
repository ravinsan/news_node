import mongoose from "mongoose"
import { MONGODB_URI } from "../envhandler.js"


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

export default connectDB;