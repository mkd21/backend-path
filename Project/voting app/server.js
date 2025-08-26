
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

import connectDB from "./DB/dbConnection.js";

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