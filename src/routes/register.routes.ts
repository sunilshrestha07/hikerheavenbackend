import { register } from "../controllers/register.controller";
import express from "express";

const router = express.Router()

router.post('/register/postregister',register)

export default  router