import MoviesModel from "../models/moviesModel.js";

const getAllMovies = async (req, res) => {
  console.log("running".bgYellow);

  try {
    const allMovies = await MoviesModel.find();
    console.log("allMovies :>> ", allMovies);

    if (allMovies.length == 0) {
      res.status(200).json({
        message: "no information in the db",
      });
    }

    res.status(200).json({
      message: "all information from db",
      amount: allMovies.length,
      allMovies,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "something went wrong",
    });
  }
};




export { getAllMovies };
