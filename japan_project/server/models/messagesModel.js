import mongoose from "mongoose";
// DEFINE SCHEMA
const messagesSchema = mongoose.Schema({
  // titel: { require: true, type: String },
  // country: { require: true, type: String },
  // countryCode: { require: true, type: String },
  // imgUrl: { require: false, type: String },
  user1_id: { require: true, type: String },
  user2_id: { require: true, type: String },
  date: { require: true, type: String },
  message:{ require: true, type: String },
  user1_name:{ require: true, type: String },
  user2_name:{ require: true, type: String },
});

// TURN INTO A MODULE
const MessagesModel = mongoose.model("Message", messagesSchema);

export default MessagesModel;
