import { NextFunction,Response,Request } from "express";
import Reviews from "../models/review.model";
import { errorHandler } from "../utils/errorHandler.utils";

export const postReview = async (req:Request ,res:Response ,next:NextFunction) =>{
    try {
        const {rating, comment, postId,userImage,userName}=req.body

        if(!postId ||!userImage || !rating ||!userName){
            return next (errorHandler(400,"All fields are required"))
        }

        const newReview = new Reviews({
            rating,
            userName,
            userImage,
            comment,
            postId
        })

        await newReview.save()
        res.status(200).json(newReview)
    } catch (error) {
        return next (errorHandler(500,(error as Error).message))
    }
}

//get review
export const getallreviews = async (req:Request ,res:Response ,next:NextFunction) =>{
    try {
        const reviews = await Reviews.find()
        res.status(200).json(reviews)
    } catch (error) {
        return next (errorHandler(500,(error as Error).message))
    }
}  

//get specific post review
export const getspecificreview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
  
      if (!postId) {
        return next(errorHandler(400, "No postId provided")); // Correct HTTP status code for missing postId
      }
  
      const reviews = await Reviews.find({ postId: postId });

      if(reviews.length === 0){
        return next (errorHandler(404,'No reviews found'))
      }

      res.status(200).json(reviews);
    } catch (error) {
      return next(errorHandler(500, (error as Error).message));
    }
  }; 

//delete review

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const deletedReview = await Reviews.findByIdAndDelete(commentId);
    if (!deletedReview) {
      return next(errorHandler(404, 'Review not found'));
    }else{
      res.status(200).json({ message: 'Review deleted successfully' });
    }
  } catch (error) {
    return next(errorHandler(500, (error as Error).message));
  }
};


export const review = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const review = await Reviews.findById(commentId);
    if (!review) {
      return next(errorHandler(404, 'Review not found'));
    }
    res.status(200).json(review);
  } catch (error) {
    return next(errorHandler(500, (error as Error).message));
  }
};