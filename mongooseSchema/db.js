
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// const mongoURL = "mongodb://127.0.0.1:27017/backendDB";
const mongoURI = process.env.MONGO_DB_URI;

const connectDB = () => {
    
    mongoose.connection.on("connected" , () =>{
        console.log("db connected");
    });

    return mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });   // mongoose object itself returns a promise so no need to write async function
}

export default connectDB;