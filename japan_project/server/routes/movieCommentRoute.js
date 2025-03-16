import express from "express"
import { deleteMovieComment, getMovieCommentsById, postMovieComment } from "../controller/movieCommentController.js";

const moviesCommentRouter = express.Router();

moviesCommentRouter.get("/all/id/:id", getMovieCommentsById)
moviesCommentRouter.post("/post/comment", postMovieComment )
moviesCommentRouter.delete("/delete/comment/_id/:id", deleteMovieComment)

export default moviesCommentRouter