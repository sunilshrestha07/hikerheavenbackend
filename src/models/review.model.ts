import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 1, 
    },
    userName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    postId: {
      type: String,
      required: true,
    },
    userImage:{
        type:String,
        required:true,
    }
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

export default Reviews;
