import express from "express"
import { getAllMessages, getMessagesBetweenTwo, postMessage } from "../controller/messagesController.js";


const messagesRouter = express.Router();

messagesRouter.get("/all", getAllMessages)
messagesRouter.get("/all/messages/:message", getMessagesBetweenTwo)
messagesRouter.post("/all/message", postMessage)

export default messagesRouter