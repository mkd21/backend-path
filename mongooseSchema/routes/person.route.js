
import { Router } from "express";
import { addUser , showUser } from "../controllers/person.controller.js";


const router = Router();

router.route("/add-user").post(addUser);

router.route("/get-user").get(showUser)

export default router;