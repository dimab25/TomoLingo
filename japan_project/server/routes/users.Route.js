import express from "express"
import { deleteUser, deleteUserPost, getAllUsers, getMyProfile, getUserByEmail, getUserById, imageUpload, login, postUserImage, registerNewUser } from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";
import jwtAuth from "../middleware/jwtAuth.js";
import { updateUserAbout, updateUserAge, updateUserEmail, updateUserImage, updateUserLocation, updateUserName, updateUserPassword, updateUserTargetLanguage, updateUserTargetLevel } from "../controller/usersUpdateController.js";



const usersRouter = express.Router();

usersRouter.get("/all", getAllUsers)
usersRouter.get("/all/emails/:email", getUserByEmail)
usersRouter.get("/all/id/:id", getUserById)
usersRouter.get("/myprofile",jwtAuth, getMyProfile)

usersRouter.post ("/uploadImage",multerUpload.single("image"), imageUpload)
usersRouter.post ("/register", registerNewUser)
usersRouter.post("/login", login)
usersRouter.post("/image/post", postUserImage)
// funktioniert noch nicht
usersRouter.delete("/image/delete/post/:id", deleteUserPost)

usersRouter.post("/update/name/user/:user_id", updateUserName)
usersRouter.post("/update/level/user/:user_id", updateUserTargetLevel)
usersRouter.post("/update/email/user/:user_id", updateUserEmail)
usersRouter.post("/update/age/user/:user_id", updateUserAge)
usersRouter.post("/update/location/user/:user_id", updateUserLocation)
usersRouter.post("/update/password/user/:user_id", updateUserPassword)
usersRouter.post("/update/targetlanguage/user/:user_id", updateUserTargetLanguage)
usersRouter.post("/update/image/user/:user_id", updateUserImage)
usersRouter.post("/update/about/user/:user_id", updateUserAbout)
usersRouter.delete("/delete/user/:user_id", deleteUser)

export default usersRouter