
import { asyncWrapper } from "../Utils/asyncWrapper.js";
import {User} from "../Models/User.model.js";

import ApiError from "../Utils/ApiError.js";

const signUp = asyncWrapper( async (req , res) =>{

    const { name , age , email , mobile ,  address , aadharCardNumber , password , role , isVoted } = req.body;
   
    if([name , age , email , mobile , address , aadharCardNumber , password  ].some( iter =>  !iter ))
    {
        throw new ApiError( 400, "all fields are required");
    }

    // before creating the user lets check if user already exist or not 

    const existingUser = await User.findOne({
        $or : [{mobile} , {aadharCardNumber}]
    });

    if(existingUser) throw new ApiError(409 , "user already present");

    const user = await User.create({name , age , email , mobile , address , aadharCardNumber , password , role , isVoted});

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser) throw new ApiError(500 , "internal server error");

    return res.status(201).json({ message : "created" , userdata : user});
});

export {signUp}