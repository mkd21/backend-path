
import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
        email : {
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

userSchema.pre("save" , async function (next){

    if(!this.isModified("password")) return next() ;

    this.password = await bcrypt.hash(this.password , 10);
    
    next();
    
});

export const User = mongoose.model("User" , userSchema);