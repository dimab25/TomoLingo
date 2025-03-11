import mongoose from "mongoose";
const movieWatchlistSchema = mongoose.Schema({
imageUrl: { require: true, type: String },
movie_id:{ require: true, type: String },
user_id:{ require: true, type: String },

},{timestamps: {createdAt: "created_at"}})


const MovieWatchlistModel = mongoose.model("Movie_watchlists", movieWatchlistSchema);
export default MovieWatchlistModel;
