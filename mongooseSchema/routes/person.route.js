
import { Router } from "express";
import { addUser , showUser , showUserAccordingToWorkType , updateUser , deleteUser } from "../controllers/person.controller.js";


const userRoute = Router();

// add users 
userRoute.route("/add-user").post(addUser);

// show existing users 
userRoute.route("/get-users").get(showUser)

// show user according to their work 
userRoute.route("/:workType").get(showUserAccordingToWorkType);

// update user details 
userRoute.route("/:id").put(updateUser);

// delete the user 
userRoute.route("/:id").delete(deleteUser);

export default userRoute;