import express from "express"
import { getAllUsers, getAllUsersEmails, imageUpload, registerNewUser } from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";



const usersRouter = express.Router();

usersRouter.get("/all", getAllUsers)
usersRouter.get("/all/emails/:email", getAllUsersEmails)
usersRouter.post ("/uploadImage",multerUpload.single("image"), imageUpload)
usersRouter.post ("/register", registerNewUser)

export default usersRouter