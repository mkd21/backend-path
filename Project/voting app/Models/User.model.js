
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        age : {
            type : Number,
            required : true
        },
        emai : {
            type : String 
        },
        mobile : {
            type : String
        },
        address : {
            type : String,
            required : true
        },
        aadharCardNumber : {
            type : Number,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        role : {
            type : String,
            enum : ["voter" , "admin"],
            default : "voter"
        },
        isVoted : {
            type : Boolean,
            default : false
        }
    } , 
    {timestamps : true}
);


export const User = mongoose.model("User" , userSchema);