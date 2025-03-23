import MovieWatchlistModel from "../models/movieWatchlistModel.js";

const getMovieWatchlistById = async (req, res) => {
  const { id } = req.params;
  try {
    const movieWatchlistById = await MovieWatchlistModel.find({
      user_id: id,
    }).exec(); //REVIEW do you know the difference between using .exec() and not? if not, you can find a good explanation here: https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
    // console.log("movieWatchlistById", movieWatchlistById);

    if (movieWatchlistById.length > 0) {
      res.status(200).json({
        message: "its working",
        amount: movieWatchlistById.length,
        movieWatchlistById,
      });
    }

    if (movieWatchlistById.length == 0) {
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
};

const postMovieWatchlist = async (req, res) => {
  const { imageUrl, movie_id, user_id } = req.body;

  const newAddObject = new MovieWatchlistModel({
    movie_id: movie_id,

    user_id: user_id,
    imageUrl: imageUrl,
  });
  try {
    const newAdd = await newAddObject.save();
    if (newAdd) {
      return res.status(201).json({
        message: "Comment sent",
        id: newAdd._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteMovieWatchlist = async (req, res) => {
  const { id } = req.params;

  const { user_id } = req.body;

  const deleteItem = new MovieWatchlistModel({
    movie_id: id,
    user_id: user_id,
  });
  try {
    const newDelete = await deleteItem.collection.deleteOne({
      movie_id: id,
      user_id: user_id,
    });
    if (newDelete) {
      return res.status(201).json({
        message: "Deleted",
        info: newDelete,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getMovieWatchlistById };
export { postMovieWatchlist };
export { deleteMovieWatchlist };
