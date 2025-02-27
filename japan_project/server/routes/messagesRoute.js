import express from "express"
import { getAllMessages, getMessagesBetweenTwo } from "../controller/messagesController.js";


const messagesRouter = express.Router();

messagesRouter.get("/all", getAllMessages)
messagesRouter.get("/all/messages/:message", getMessagesBetweenTwo)

export default messagesRouter