import { deleteReview, getallreviews, getspecificreview, postReview, review } from "../controllers/review.controllers";
import express from "express";

const router = express.Router()

router.post('/review/postreview',postReview)
router.get('/review/allreviews',getallreviews)
router.get('/review/:postId',getspecificreview)
router.delete('/review/deletespecific/:commentId', deleteReview);
router.get('/review/specific/:commentId',review)

export default router