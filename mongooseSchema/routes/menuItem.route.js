

import { Router } from "express";

import { addMenuItems , getMenuItems } from "../controllers/menuItems.controller.js";


const menuRouter = Router();

menuRouter.route("/add-items").post(addMenuItems);
menuRouter.route("/get-items").get(getMenuItems);


export default menuRouter;