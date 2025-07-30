
import { Router } from "express";
import { addUser , showUser , showUserAccordingToWorkType , updateUser , deleteUser } from "../controllers/person.controller.js";


const userRoute = Router();

userRoute.route("/add-user").post(addUser);

userRoute.route("/get-users").get(showUser)

userRoute.route("/:workType").get(showUserAccordingToWorkType);

userRoute.route("/:id").put(updateUser);

userRoute.route("/:id").delete(deleteUser);

export default userRoute;