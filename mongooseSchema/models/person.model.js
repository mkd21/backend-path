

import mongoose from "mongoose";

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
    }

} , {timestamps : true} );


export const Person = mongoose.model("Person" , personSchema);