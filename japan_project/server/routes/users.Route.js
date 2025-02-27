import express from "express"
import { getAllUsers, getAllUsersEmails } from "../controller/usersController.js";



const usersRouter = express.Router();

usersRouter.get("/all", getAllUsers)
usersRouter.get("/all/emails/:email", getAllUsersEmails)

export default usersRouter