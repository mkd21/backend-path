
import express from "express";

const app = express();

// for parsing application/json 
app.use(express.json());



// user routes 
import router from "./routes/person.route.js";

app.use("/api/user" , router);


// menu routes 
import menuRouter from "./routes/menuItem.route.js";

app.use("/api/menu" , menuRouter);

export default app;