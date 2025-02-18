import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name :{
            type :String,
            required: true
        },
        avatar:{
            type:String,
            default:'https://imgs.search.brave.com/I48V944-iX7EH6ovgJvY55ywjTLyXh1ACcuZmFthIEQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbmV1dHJvLWVz/c2VudGlhbC8zMi91/c2VyLTY0LnBuZw'
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false,
        }
    },{timestamps:true})
    const User = mongoose.model("User",userSchema)
    export default User