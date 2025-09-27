
import { Candidate } from "../Models/Candidate.model.js";
import { asyncWrapper } from "../Utils/asyncWrapper.js";
import ApiError from "../Utils/ApiError.js";

const signupCandidate = asyncWrapper( async(req , res) =>{

    const {name , age , politicalParty} = req.body;

    if([name , age , politicalParty].some(iter => !iter)) throw new ApiError(400 , "all fields are required");
    

    const createdCandidate = await Candidate.create({name , age , politicalParty});

    return res.json({createdCandidate});
});

export {signupCandidate};