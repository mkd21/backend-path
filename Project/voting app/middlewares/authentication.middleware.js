import ApiError from "../Utils/ApiError.js";

import jwt from "jsonwebtoken";

import { User } from "../Models/User.model.js";

const authMiddleware = async (req, res, next) => {

  try 
  {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ") )
    {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const [ , accessToken] = authHeader.split(" ");

    if (!accessToken) throw new ApiError(401, "unauthorised access");


    // // verifying if user is genuine or not

    const verifiedUser = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_KEY);

    const user = await User.findById(verifiedUser.id).select("-refreshToken")

    req.specificUser = user;
    next();

  } 
  catch (err) 
  {
    throw new ApiError(401, "invalid token");
  } 

};

export default authMiddleware;