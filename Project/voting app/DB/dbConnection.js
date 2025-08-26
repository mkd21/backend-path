
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

const connectDB = () =>{

    return mongoose.connect(mongoURI , { serverSelectionTimeoutMS: 5000 } );
}

export default connectDB;