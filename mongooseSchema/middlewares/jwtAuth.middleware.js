
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

import jwt from "jsonwebtoken";

import { Person } from "../models/person.model.js";

const jwtAuth = asyncHandler(async (req, _, next) => {

    if (!req.headers.authorization) throw new ApiError(400, "token not found");

    // we will receive token through authorization property inside req.headers
    const token = req.headers.authorization.split(" ")[1];

    // check if token is valid or not 
    const validatedToken = jwt.verify(token, process.env.SECRET_KEY);

    // if not validated then throw error 
    if (!validatedToken) throw new ApiError(400, "invalid token");

    // if validated thne find the desired document 
    
    const user = await Person.findById(validatedToken?.id).select("-password");
    console.log(user);

    req.desiredUser = user;
    next();
});


export { jwtAuth }