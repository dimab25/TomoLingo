import express from "express"
import { getAllMovies } from "../controller/moviesController.js";

const moviesRouter = express.Router();

moviesRouter.get("/all", getAllMovies)
moviesRouter.get("/all/movies", getAllMovies)

export default moviesRouter