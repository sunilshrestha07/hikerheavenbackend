import { NextFunction, Request, Response } from "express";
import Register from "../models/register.model";
import { errorHandler } from "../utils/errorHandler.utils";

export const register = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email , number , name}= req.body

        if(!email || !number || !name){
            return next (errorHandler(404,"All fields are required"))
        }

        const register = new Register({
            name,
            email,
            number,
        })

        await register.save()
        res.status(200).json(register)
    } catch (error) {
        return next (errorHandler(500,(error as Error).message))
    }
}