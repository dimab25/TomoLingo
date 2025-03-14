import mongoose, { Schema } from "mongoose";

// DEFINE SCHEMA
const usersSchema = mongoose.Schema(
  {
    name: { require: true, type: String },
    password: { require: true, type: String },
    email: { unique: true, require: true, type: String },
    age: { require: true, type: Number },
    imageUrl: { require: false, type: String },
    about: { require: true, type: String },
    native_language: { require: true, type: String },
    target_language_level: { require: true, type: String },
    target_language: { require: true, type: String },
    location: { require: true, type: String },
    posts: [
      { require: false, type: mongoose.Schema.Types.ObjectId, ref: "Posting" },
    ],
  },
  { timestamps: { createdAt: "created_at", modifiedAt: "modified_at" } }
);

const postingsSchema = mongoose.Schema(
  {
    imageUrl: { require: true, type: String },
  text: { require: true, type: String },
  user_id: { require: true, type: String },},
  { timestamps: { createdAt: "created_at", modifiedAt: "modified_at" } 
});
// TURN INTO A MODULE
const UsersModel = mongoose.model("User", usersSchema);
const PostingsModel = mongoose.model("Posting", postingsSchema);

export default UsersModel;
export { PostingsModel };
