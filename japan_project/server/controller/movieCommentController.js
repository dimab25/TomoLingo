import MovieCommentModel from "../models/movieCommentModel.js";
import mongoose from "mongoose";
const getMovieCommentsById =async (req, res) => {
    const { id } = req.params;

    try {
        const movieById = await MovieCommentModel.find({ movie_id: id }).populate({path:"user_id", select:["name", "imageUrl"]}).exec();
        console.log("movieById", movieById);
    
        if (movieById.length > 0) {
          res.status(200).json({
            message: "its working",
            amount: movieById.length,
            movieById,
          });
        }
    
        if (movieById.length == 0) {
          res.status(200).json({
            message: "no information in the db",
          });
        }
      } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json({
          error: "something went wrong",
        });
        return;
      }
}

const postMovieComment = async (req, res) => {
    const { language_level, movie_id, rating, user_id, user_imageUrl, comment  } = req.body;
  
    const newCommentObject = new MovieCommentModel({
        language_level: language_level,
        movie_id: movie_id,
        rating: rating,
        user_id: user_id,
        user_imageUrl: user_imageUrl,
        comment: comment,
            })
        try {
            const newComment = await newCommentObject.save();
        if(newComment){
          return res.status(201).json({
            message: "Comment sent",
            id: newComment._id,
                           });
        }
        } catch (error) {
          return res.status(500).json({ error: "Something went wrong" });
        }
        }

        const deleteMovieComment= async (req, res) => {
          const { id } = req.params;
        
              
          const commentObjectId = new mongoose.Types.ObjectId(id);
          // console.log("Converted userObjectId:", commentObjectId);
      
        try {
          const newDelete = await MovieCommentModel.deleteOne({_id: commentObjectId});
          if (newDelete) {
            return res.status(201).json({
              message: "Deleted",
              info: newDelete,
            });
          }
        } catch (error) {
          return res.status(500).json({ error: "Something went wrong" });
        }
        }
export { getMovieCommentsById };
export { postMovieComment };
export {deleteMovieComment}