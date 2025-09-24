
import ApiError from "../Utils/ApiError.js";

import jwt from "jsonwebtoken";
import { User } from "../Models/User.model.js";

export const changePasswordMiddleware = async (req , res , next) => {

    try
    {
        const accessToken = req.headers.authorization;

        if( !accessToken || !accessToken.startsWith("Bearer ") ) throw new ApiError(401 , "unauthorised access");

        const [ , tokenOnly] = accessToken.split(" ");

        if(!tokenOnly) throw new ApiError(401 , "unauthorised access");

        // now lets verify the user is genuine or not 

        const verifiedUser = jwt.verify(tokenOnly , process.env.ACCESS_TOKEN_SECRET_KEY);

        if(!verifiedUser) throw new ApiError(401 , "user not verified");

        const user = await User.findById(verifiedUser.id).select("-refreshToken +password");

        req.specificUser = user;

        next();
    }
    catch(err)
    {
        throw new ApiError(401 , err);
    }   

}