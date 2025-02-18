import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "./config/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Importing routers
import postRouters from "../src/routes/post.routes";
import userRouters from "../src/routes/user.routes";
import reviewRouters from "../src/routes/review.routes";
import registerROuter from "../src/routes/register.routes";
import messageRouter from "../src/routes/message.routes"

// Getting values from the config
const port = config.port || 5000;
const mongo_uri = config.mongoURI;

if (!mongo_uri) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1); // Exit the application with an error code
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
const connectDb = async () => {
    try {
        await mongoose.connect(mongo_uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the application if unable to connect to MongoDB
    }
};
connectDb();

// Test Route
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running');
});

// Routes
app.use('/api', postRouters);
app.use('/api', userRouters);
app.use('/api', reviewRouters);
app.use('/api', registerROuter);
app.use('/api', messageRouter)


// Error handling middleware (should be placed at the end)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = err.statusCode || 500;
    const message: string = err.message || "Internal server error";
    console.error("Error:", err);
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
