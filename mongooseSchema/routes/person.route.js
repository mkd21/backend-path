
import { Router } from "express";
import { addUser , showUser , showUserAccordingToWorkType } from "../controllers/person.controller.js";


const userRoute = Router();

userRoute.route("/add-user").post(addUser);

userRoute.route("/get-user").get(showUser)

userRoute.route("/:workType").get(showUserAccordingToWorkType);


export default userRoute;