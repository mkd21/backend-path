
import mongoose ,  {Schema} from "mongoose";


const menuSchema = Schema({

    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    taste : {
        type : String,
        enum : ["sweet" , "spicy" , "sour" , "neutral"],
        required : true
    },
    is_drink : {
        type : Boolean,
        default : false
    },
    ingredients : {
        type : [String],
        default : []
    },
    num_sales : {
        type : Number,
        default : 0
    }

} , {timestamps : true});


export const MenuItem = mongoose.model("MenuItem" , menuSchema);