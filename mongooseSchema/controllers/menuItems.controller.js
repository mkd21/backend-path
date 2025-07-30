
import { MenuItem } from "../models/menuItem.model.js";
import asyncHandler from "../utils/asyncHandler.js";

import ApiError from "../utils/ApiError.js";

const addMenuItems = asyncHandler( async(req , res) =>{

    const {name , price , taste , is_drink , ingredients , num_sales } = req.body;

    console.log(name , price , taste , is_drink , ingredients , num_sales);

    if([name , price , taste , is_drink , ingredients , num_sales].some( 
        (items) => items === undefined || items === null || items === "" ) )
    {
        throw new ApiError(400 , "all fields are required");
    }

    const dish = await MenuItem.create({name , price , taste , is_drink , ingredients , num_sales});

    return res.status(201).json({message : "success" , data : dish});
});

const getMenuItems = asyncHandler( async(_ , res) =>{

    const availableMenuItems = await MenuItem.find();

    if(availableMenuItems.length === 0) throw new ApiError(404 , "no item available");

    return res.status(200).json({message : "success" , data : availableMenuItems});

});


export {addMenuItems , getMenuItems};