
import mongoose from "mongoose";

const candidateSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        politicalParty : {
            type : String,
            required : true
        },
        age : {
            type : String,
            required : true
        },
        votes : [
            {
                user : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "User",
                    required : true
                },
                votedAt : {
                    type : Date,
                    default : Date.now()
                }
            }
        ],
        voteCount : {
            type : Number,
            default : 0
        }
    } , 
    
    {timestamps : true}
);

export const Candidate = mongoose.model("Candidate" , candidateSchema);