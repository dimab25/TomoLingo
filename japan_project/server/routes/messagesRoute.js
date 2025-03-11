import express from "express"
import { getAllMessages, getChatPartner, getMessagesBetweenTwo, getMessagesById, postMessage } from "../controller/messagesController.js";


const messagesRouter = express.Router();

messagesRouter.get("/all", getAllMessages)
messagesRouter.get("/all/messages/:message", getMessagesBetweenTwo)
messagesRouter.get("/all/messages/between_two/:id", getMessagesById)
messagesRouter.get("/all/messages/partner/:id", getChatPartner)
messagesRouter.post("/all/message", postMessage)

export default messagesRouter