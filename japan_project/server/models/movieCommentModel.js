import mongoose from "mongoose";
// DEFINE SCHEMA
const movieCommentSchema = mongoose.Schema({
  language_level: { require: true, type: Number },
  movie_id: { require: true, type: String },
  rating: { require: true, type: Number },
  user_id: { require: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user_imageUrl: { require: true, type: String },
  comment: { require: false, type: String },
},{timestamps: {createdAt: "created_at"}})

// TURN INTO A MODULE
const MovieCommentModel = mongoose.model("Movie_comments", movieCommentSchema);

export default MovieCommentModel;