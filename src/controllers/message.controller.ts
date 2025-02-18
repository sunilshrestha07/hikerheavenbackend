import { NextFunction,Response,Request } from "express";
import { errorHandler } from "../utils/errorHandler.utils";
import Message from "../models/message.model";

export const postMessage = async (req:Request ,res:Response ,next:NextFunction) =>{
    try {
        const {email , message}=req.body

        if(!email || !message){
            return next (errorHandler(400,"All fields are required"))
        }

        const newMessage = new Message({
            email,
            message
        })

        await newMessage.save()
        res.status(200).json(newMessage)
    } catch (error) {
        return next (errorHandler(500,(error as Error).message))
    }
}