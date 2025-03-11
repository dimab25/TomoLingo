import express from "express"
import { getMovieCommentsById, postMovieComment } from "../controller/movieCommentController.js";

const moviesCommentRouter = express.Router();

moviesCommentRouter.get("/all/id/:id", getMovieCommentsById)
moviesCommentRouter.post("/post/comment", postMovieComment )


export default moviesCommentRouter