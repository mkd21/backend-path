

import { Router } from "express";

const candidateRoute = Router();

import { signupCandidate } from "../Controllers/candidate.controller.js";


candidateRoute.route("/createCandidate").post(signupCandidate);


export default candidateRoute;