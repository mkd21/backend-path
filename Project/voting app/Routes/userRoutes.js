
import { Router } from "express";

import { signUp , login , profile , changePassword} from "../Controllers/user.controller.js";

import authMiddleware from "../middlewares/authentication.middleware.js";
import { changePasswordMiddleware } from "../middlewares/changePassword.middleware.js";

const router = Router();


router.route("/signup").post(signUp);
router.route("/login").post(login);

// protected routes 

router.route("/profile").post( authMiddleware, profile);
router.route("/profile/password").put( changePasswordMiddleware , changePassword );

export default router;