
import express from "express";
const app = express();

// for parsing application/json 
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


import passport from "passport";
app.use(passport.initialize());



import "./passport-local-strategy.js";

app.post("/" , passport.authenticate("local" , {session : false}), (req , res) =>{
    res.send("Welcome to Hotel");
})

// middleware to track the logs 

const trackLogs = (req , res , next) =>{

    console.log(`login date was ${new Date().toLocaleDateString()} and request is made to ${req.originalUrl}`);
    next();
}

app.use(trackLogs);  // middleware is applied on all the routes


// user routes 
import userRoute from "./routes/person.route.js";
app.use("/api/user" , userRoute);


// menu routes 
import menuRouter from "./routes/menuItem.route.js";
app.use("/api/menu" , menuRouter);




export default app;