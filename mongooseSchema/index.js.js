
import connectDB from "./db.js";

import app from "./app.js";


connectDB()
.then( () =>{
    app.listen(3000 , () =>{
        console.log("server is live at port 3000");
    })
})
.catch( (error) =>{
    console.log("Error is",error);
    process.exit(1);
})