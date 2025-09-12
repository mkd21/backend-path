
import { Router } from "express";
import { addUser , showUser , showProfile , showUserAccordingToWorkType , updateUser , deleteUser , loginUser } from "../controllers/person.controller.js";

import { jwtAuth } from "../middlewares/jwtAuth.middleware.js";

const userRoute = Router();

// add users 
userRoute.route("/signup").post(addUser);


//login users
userRoute.route("/login").post(loginUser)


// show user profile 
userRoute.route("/profile").get( jwtAuth ,showProfile);


// show existing users 
userRoute.route("/get-users").get(showUser);


// show user according to their work 
userRoute.route("/:workType").get(showUserAccordingToWorkType);

// update user details 
userRoute.route("/:id").put(updateUser);

// delete the user 
userRoute.route("/:id").delete(deleteUser);

export default userRoute;