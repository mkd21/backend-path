
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));


import router from "./Routes/userRoutes.js";
import candidateRoute from "./Routes/candidateRoutes.js";


app.use("/api",router);
app.use("/api/adminRoles",candidateRoute);

export default app;