import mongoose from "mongoose";

const s = new mongoose.Schema({
    email:{
        unique:true,
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    fullname:{
        type:String,
        require: true
    }
    ,
    gender:{
        type:String,
        require: true,
        
    },
    passForget:{
        type:String
    }

});



export default mongoose.model("user",s)