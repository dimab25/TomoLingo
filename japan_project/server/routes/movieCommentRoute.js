import express from "express";
import {
  deleteMovieComment,
  getMovieCommentsById,
  postMovieComment,
} from "../controller/movieCommentController.js";

const moviesCommentRouter = express.Router();

moviesCommentRouter.get("/all/id/:id", getMovieCommentsById); //REVIEW this kind of paths are somehow redundant, /:id already tells you are sending/receiving and ID
moviesCommentRouter.post("/post/comment", postMovieComment);
moviesCommentRouter.delete("/delete/comment/_id/:id", deleteMovieComment);

export default moviesCommentRouter;
