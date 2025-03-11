import express from "express"
import { deleteMovieWatchlist, getMovieWatchlistById, postMovieWatchlist } from "../controller/movieWatchlistController.js";

const movieWatchlistRouter = express.Router();

movieWatchlistRouter.get("/user_id/:id", getMovieWatchlistById);
movieWatchlistRouter.post("/post/user_id", postMovieWatchlist);
movieWatchlistRouter.delete("/delete/movie_id/:id", deleteMovieWatchlist);

export default movieWatchlistRouter