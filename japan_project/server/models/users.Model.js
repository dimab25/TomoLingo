import mongoose from "mongoose";
// DEFINE SCHEMA
const usersSchema = mongoose.Schema({
  name: { require: true, type: String },
  password: { require: true, type: String },
  email: { unique: true, require: true, type: String, },
  age: { require: false, type: Number },
  imageUrl: { require: false, type: String },
  },
  // {timestamps: {createdAt: "created_at", modifiedAt: "modified_at"} }
);

// TURN INTO A MODULE
const UsersModel = mongoose.model("User", usersSchema);

export default UsersModel;