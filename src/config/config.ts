import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: string;
  mongoURI: string;
  api: string;
  JWT_SECRET: string;
}

const config: Config = {
  port: process.env.PORT!,
  mongoURI: process.env.MONGO_URI!,
  api: process.env.api!,
  JWT_SECRET: process.env.JWT_SECRET!
}

export default config;
