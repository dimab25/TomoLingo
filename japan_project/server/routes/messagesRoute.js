import express from "express"
import { getAllMessages, getChatPartner, getChatsTest, getMessagesBetweenTwo, getMessagesById, getMessagesTest, postMessage, postMessageTest } from "../controller/messagesController.js";


const messagesRouter = express.Router();

messagesRouter.get("/all", getAllMessages)
messagesRouter.get("/all/messages/:message", getMessagesBetweenTwo)
messagesRouter.get("/all/messages/between_two/:id", getMessagesById)
messagesRouter.get("/all/messages/partner/:id", getChatPartner)
messagesRouter.post("/all/message", postMessage)

messagesRouter.get("/users/messages/:user1", getMessagesTest)
messagesRouter.get("/users/messages/chats/:user1", getChatsTest)
messagesRouter.post("/users/messages/post", postMessageTest)

export default messagesRouter