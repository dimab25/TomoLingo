import mongoose from "mongoose";
// DEFINE SCHEMA
const messagesSchema = mongoose.Schema({

  from_id: { require: true, type: String },
  to_id: { require: true, type: String },
   message:{ require: true, type: String },
  from_name:{ require: true, type: String },
  to_name:{ require: true, type: String },
},{timestamps: {createdAt: "created_at"}})

// TURN INTO A MODULE
const MessagesModel = mongoose.model("Message", messagesSchema);

export default MessagesModel;
