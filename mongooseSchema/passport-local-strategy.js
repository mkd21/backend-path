
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";


import { Person } from "./models/person.model.js";


passport.use(new LocalStrategy( {
    usernameField : "userName",
    passwordField : "password"
}, 
async(userName , password , done) =>{

    console.log(userName , password);
    try 
    {
        const user = await Person.findOne({userName});
        
        if(!user){
            return done(null , false , {message : "No user Found"});
        }

        const isPasswordMatch = await user.isPasswordCorrect(password);

        if(isPasswordMatch){
            return done(null , user);
        }

        console.log("password match? :",isPasswordMatch);
        return done(null , false , {message : "password dont match"});
        
    }
    catch(err)
    {
        return done(err);
    }

}));