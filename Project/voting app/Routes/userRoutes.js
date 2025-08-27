
import { Router } from "express";

import { signUp , login} from "../Controllers/user.controller.js";

const router = Router();


router.route("/signup").post(signUp);
router.route("/login").post(login);

export default router;