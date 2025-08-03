

import mongoose from "mongoose";

import bcrypt from "bcrypt";

const personSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
    },
    work : {
        type : String,
        enum : ["chef" , "waiter" , "manager"],
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    address : {
        type : String,
    },
    salary : {
        type : Number,
        required : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }

} , {timestamps : true} );


personSchema.pre("save" , async function(next){

    if(!this.isModified("password")) return next();
    try
    {
        const salt = await bcrypt.genSalt(10);
        
        // hash password 
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch(err)
    {
        return next(err);
    }
});

personSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password, this.password);
}

export const Person = mongoose.model("Person" , personSchema);