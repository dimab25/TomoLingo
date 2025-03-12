import express from "express"
import { getAllUsers, getMyProfile, getUserByEmail, getUserById, imageUpload, login, postUserImage, registerNewUser } from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";
import jwtAuth from "../middleware/jwtAuth.js";



const usersRouter = express.Router();

usersRouter.get("/all", getAllUsers)
usersRouter.get("/all/emails/:email", getUserByEmail)
usersRouter.get("/all/id/:id", getUserById)
usersRouter.get("/myprofile",jwtAuth, getMyProfile)

usersRouter.post ("/uploadImage",multerUpload.single("image"), imageUpload)
usersRouter.post ("/register", registerNewUser)
usersRouter.post("/login", login)
usersRouter.post("/image/post", postUserImage)


export default usersRouter