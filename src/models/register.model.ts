import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required : true
    },
    number:{
        type:Number,
        required: true,
    }
},{timestamps:true})

const Register = mongoose.model("Register",registerSchema)
export default Register