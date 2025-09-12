
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db.js";

import app from "./app.js";

const port = process.env.PORT || 5000;

connectDB()
.then( () =>{
    app.listen(port , () =>{
        console.log(`Server is live at port ${port}`);
    })
})
.catch( (error) =>{
    console.log("Error is",error);
    process.exit(1);
})