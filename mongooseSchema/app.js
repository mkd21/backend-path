
import express from "express";

const app = express();

// for parsing application/json 
app.use(express.json());



// user routes 
import userRoute from "./routes/person.route.js";

app.use("/api/user" , userRoute);


// menu routes 
import menuRouter from "./routes/menuItem.route.js";

app.use("/api/menu" , menuRouter);

export default app;