import mongoose from "mongoose";
// DEFINE SCHEMA
const usersSchema = mongoose.Schema({
  name: { require: true, type: String },
  email: { require: true, type: String },
  age: { require: true, type: Number },
  });

// TURN INTO A MODULE
const UsersModel = mongoose.model("User", usersSchema);

export default UsersModel;