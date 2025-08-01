
import { MenuItem } from "../models/menuItem.model.js";
import asyncHandler from "../utils/asyncHandler.js";

import ApiError from "../utils/ApiError.js";

const addMenuItems = asyncHandler( async(req , res) =>{

    const {name , price , taste , is_drink , ingredients , num_sales } = req.body;


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


const menuItemsAccordingToTaste = asyncHandler( async(req , res) =>{

    const taste = req.params.taste;

    if(taste != "sweet" && taste != "sour" && taste != "spicy" && taste != "neutral") throw new ApiError(404 , "no food of that specific taste is available");

    const foodItems = await MenuItem.find({taste});

    console.log(foodItems);

    if(foodItems.length === 0) throw new ApiError(500 , "internal server error");

    return res.status(200).json({message : "success" , data : foodItems});

});

 
const updateMenuItems = asyncHandler( async(req , res) =>{

    const foodId = req.params.id;
    console.log(foodId);

    const newData = req.body;
    console.log(newData);

    const updatedFoodItem = await MenuItem.findByIdAndUpdate(foodId , newData , { new : true , runValidators : true });

    if(!updatedFoodItem) throw new ApiError("404" , "no data found");

    return res.status(200).json({message : "success" , data : updatedFoodItem});

});


const deleteMenuItems = asyncHandler( async(req , res) =>{

    const itemId = req.params.id;

    const deletedItem = await MenuItem.findByIdAndDelete(itemId);
    if(!deletedItem) throw new ApiError(404 , "item not found");

    return res.status(200).json({message : "delete successful"});
});

export {addMenuItems , getMenuItems , menuItemsAccordingToTaste , updateMenuItems , deleteMenuItems};