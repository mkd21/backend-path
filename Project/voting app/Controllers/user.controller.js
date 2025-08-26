
import { asyncWrapper } from "../Utils/asyncWrapper.js";


const signUp = asyncWrapper( async (req , res) =>{

    console.log(req);

    return res.status(201).json({ message : "created" });
});

export {signUp}