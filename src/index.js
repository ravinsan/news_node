import connectDB from "./connectDB/db.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

app.get('/', (req, res) => res.send("Hello World!"));
const PORT = process.env.PORT;

const startserver = async () =>{
    try{
        await connectDB();
        app.listen(PORT, () =>  {return console.log(`Server started on port ${PORT}`)});
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

startserver();
