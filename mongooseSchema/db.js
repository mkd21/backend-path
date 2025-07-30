
import mongoose from "mongoose";

const mongoURL = "mongodb://127.0.0.1:27017/backendDB";

const connectDB = () => {
    
    mongoose.connection.on("connected" , () =>{
        console.log("db connected");
    });

    return mongoose.connect(mongoURL, { serverSelectionTimeoutMS: 5000 });   // mongoose obejct itself returns a promise so no need to write async function
}

export default connectDB;