import { NextFunction,Response,Request } from "express";
import User from "../models/user.model";
import { errorHandler } from "../utils/errorHandler.utils";
import bcryptjs from 'bcryptjs'
import jwt  from "jsonwebtoken";
import config from "../config/config";

export const signup = async (req:Request ,res:Response ,next:NextFunction) =>{
    try {
        //chech if all info are filled
        const {name , email , password} = req.body
        if(!name || !email || !password){
            return next (errorHandler(400,"All fields are required"))
        }

        const exgistingEmail =await User.findOne({email})
        if(exgistingEmail){
            return next (errorHandler(500,'Email already exists'))
        }

        //hashing password
        const hashedPassword = bcryptjs.hashSync(password,10)

        // creating new user
        const newUser = new User({
            name,
            email,
            password : hashedPassword
        })

        //saving newUser
        await newUser.save()

        //returning user
        res.status(200).json(newUser)
    } catch (error) {
        return next (errorHandler(500,(error as Error).message))
    }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Getting email and password from request body
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return next(errorHandler(400, "All fields are required"));
        }

        // Validate if the user exists in the database
        const validUser = await User.findOne({ email });

        // If email is not found in the database
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }

        // Validate password
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        // If password doesn't match
        if (!validPassword) {
            return next(errorHandler(401, "Incorrect password"));
        }

        // Destructure to exclude password from the response
        const { password: pass, ...rest } = validUser.toObject();

        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, config.JWT_SECRET, { expiresIn: '24h' });

        // Set token as a cookie
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);
    } catch (error) {
        return next(errorHandler(500, (error as Error).message));
    }
};

//google login
export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, avatar } = req.body;

    try {
        // Check if the user with the given email already exists
        const validUser = await User.findOne({ email });

        if (validUser) {
             // Destructure to exclude password from the response
        const { password: pass, ...rest } = validUser.toObject();

        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, config.JWT_SECRET, { expiresIn: '24h' });

        // Set token as a cookie
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

        } else {
            // If the user doesn't exist, create a new user with generated password
            const generatedPassword = name + Math.random().toString(9).slice(-4);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                avatar,
            });

            // Generate JWT token for the new user
            const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, { expiresIn: '24h' });
            const { password: pass, ...rest } = newUser.toObject();

            // Save the new user to the database
            await newUser.save();

            // Send the JWT token in a cookie
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
    } catch (error) {
        // Handle errors and return an appropriate response
        return next(errorHandler(401, 'Error login with Google'));
    }
};

//get all users
export const users = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        return next(errorHandler(500, (error as Error).message));
    }
}


//update userprofile

export const userUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    if (!userId) {
        return next(errorHandler(401, 'You are not authorized to update'));
    }

    if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true });

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const {password,...rest}=updatedUser.toObject()
        res.status(200).json(rest)
    } catch (error) {
        return next(errorHandler(500, (error as Error).message));
    }
};


//deleter user 
export const deleteUser =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params
        if(!userId){
            return next (errorHandler(404,'No such user'))
        }
        const deleteUser = await User.findByIdAndDelete(userId)
        if(!deleteUser){
            return next (errorHandler(404,'No such user'))
        }else{
            res.status(200).json({ message: 'User deleted successfully' });
        }

        
    } catch (error) {
        return next (errorHandler(500,(error as Error).message))
    }
}