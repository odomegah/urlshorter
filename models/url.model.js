import mongoose  from "mongoose";

const u = new mongoose.Schema({
    former:{
        type: String,
        require: true
    },
    url:{type:String, require:true},
    current:{
        type:String,
        require: true
    },
    visited:Number,
    createdAt:Number,
    updatedAt:Number,
    owner:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
});

export const Url = mongoose.model("url",u)