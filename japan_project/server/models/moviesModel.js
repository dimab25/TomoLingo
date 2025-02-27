import mongoose from "mongoose";
// DEFINE SCHEMA
const moviesSchema = mongoose.Schema({
  titel: { require: true, type: String },
  country: { require: true, type: String },
  countryCode: { require: true, type: String },
  imgUrl: { require: false, type: String },
});

// TURN INTO A MODULE
const MoviesModel = mongoose.model("Movie", moviesSchema);

export default MoviesModel;
