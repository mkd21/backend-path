
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            required : true,
            select : false     // will not send password by default in the fetched documents
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

userSchema.methods.isPasswordCorrect = async function (password){

    return await bcrypt.compare(password , this.password);

}

userSchema.methods.generateAccessToken = function()
{
    return jwt.sign({ id : this._id } , process.env.ACCESS_TOKEN_SECRET_KEY , {expiresIn : "15m" } )
}

userSchema.methods.generateRefreshToken = function()
{
    return jwt.sign( { id : this._id } , process.env.REFRESH_TOKEN_KEY , {expiresIn : "7d"} )
}

export const User = mongoose.model("User" , userSchema);