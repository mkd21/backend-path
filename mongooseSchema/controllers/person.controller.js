
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

    return res.status(201).json({success : "User created" , data : user});

});

// get all user data 
const showUser = asyncHandler( async (_ , res) =>{

    const people = await Person.find();

    if(people.length == 0) throw new ApiError(404 , "no data found");

    return res.status(200).json({message : "success" , data : people});

})

// find user w.r.t work type eg : manager , chef , waiter

const showUserAccordingToWorkType = asyncHandler( async(req , res) =>{

    const workType = req.params.workType;    // will extract the workType from the url
    console.log(workType);

    if(workType != "chef" && workType != "waiter" && workType != "manager") throw new ApiError(400 , "invalid request");

    const desiredUserDetails = await Person.find({work : workType});

    return res.status(200).json({message : "success" , data : desiredUserDetails});

});

// update user 
const updateUser = asyncHandler( async(req , res) =>{

    const userId = req.params.id;
    const dataToUpdate = req.body;

    const user = await Person.findByIdAndUpdate(userId , dataToUpdate ,  {
        new : true, // will return the updated document
        runValidators : true   // will run the mongoose validation
    });


    if(!user) throw new ApiError(404 , "User not found");

    return res.status(200).json({message : "success" , data : user});

});


// delete user 

const deleteUser = asyncHandler( async(req , res) =>{

    const userID = req.params.id;
    const deletedUser = await Person.findByIdAndDelete(userID);

    if(!deletedUser) throw new ApiError(404 , "user not found");

    return res.status(200).json({message : "success"});
});


export {addUser , showUser , showUserAccordingToWorkType , updateUser , deleteUser };