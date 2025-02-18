import { postMessage } from "../controllers/message.controller";
import express from "express";

const router = express.Router()

router.post('/message/postmessage',postMessage)

export default  router