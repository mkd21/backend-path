
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));


import router from "./Routes/userRoutes.js";

app.use("/api",router);

export default app;