
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";


import { Person } from "./models/person.model.js";


passport.use(new LocalStrategy( {
    usernameField : "userName",
    passwordField : "password"
}, 
async(userName , password , done) =>{

    try 
    {
        const user = await Person.findOne({userName});
        
        if(!user){
            return done(null , false , {message : "No user Found"});
        }

        const isPasswordMatch = user.password === password ? true : false;

        if(isPasswordMatch){
            return done(null , user);
        }
    }
    catch(err)
    {
        return done(err);
    }

}));