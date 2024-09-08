import connectDB from "./connectDB/db.js";
import { PORT } from "./envhandler.js";
import app from "./app.js";


app.get('/', (req, res) => res.send("Hello World!"));


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
