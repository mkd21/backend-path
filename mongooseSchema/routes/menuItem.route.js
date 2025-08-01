

import { Router } from "express";

import { addMenuItems , getMenuItems , menuItemsAccordingToTaste , updateMenuItems , deleteMenuItems } from "../controllers/menuItems.controller.js";


const menuRouter = Router();

// add menu items 
menuRouter.route("/add-items").post(addMenuItems);

// show all the menu items 
menuRouter.route("/get-items").get(getMenuItems);


// show menu items according to the taste 
menuRouter.route("/:taste").get(menuItemsAccordingToTaste);

// update menu items 
menuRouter.route("/:id").put(updateMenuItems);


// delete menu item 
menuRouter.route("/:id").delete(deleteMenuItems);

export default menuRouter;