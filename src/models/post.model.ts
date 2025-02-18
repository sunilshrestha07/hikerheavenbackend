import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{    
        type: String,
        required: true
    },
    image:{
        type:String,
        required:false
    },
    level:{
        type:String,
        required: true
    },
    map:{
        type:String,
        required: true
    },
    district:{
        type:String,
        required: true
    },
    rating:{
        type:String,
        required:true
    }
},{timestamps: true});

const Post = mongoose.model("Post", postSchema);
export default Post