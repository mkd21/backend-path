
import { Person } from "../models/person.model.js";
import asyncHandler from "../utils/asyncHandler.js";

import ApiError from "../utils/ApiError.js";


const addUser = asyncHandler( async (req , res) =>{

    const {name , age , work , email , address , salary } = req.body;
   
    // check if mandatory data is present or not 

    if([name , age , work , email , address , salary].some( fields => !fields  ))
    {
        throw new ApiError(400 , "All fields are required");
    }

    const user = await Person.create({
        name,
        age,
        work,
        email,
        address,
        salary
    });

    return res.status(201).json({success : "User created"});

});

// get user data 

const showUser = asyncHandler( async (_ , res) =>{

    const people = await Person.find();

    if(people.length == 0) throw new ApiError(404 , "no data found");

    return res.status(200).json({message : "success" , data : peoples});

})



export {addUser , showUser };