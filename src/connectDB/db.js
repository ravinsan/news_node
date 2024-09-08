import mongoose from "mongoose"


const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://ravinsan15:2KXvkHUlqycswf08@newsdb.vjsdv.mongodb.net/news_db')
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

export default connectDB;