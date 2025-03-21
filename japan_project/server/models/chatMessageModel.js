import mongoose from "mongoose";
// DEFINE SCHEMA
const chatSchema = mongoose.Schema({

 text:{ require: true, type: String },

 author: { require: true, type: String },

  author_id: { require: true, type: String },
  
 postingDate:{ require: true, type: Number },
 name: { require: true, type: String },
 image: { require: true, type: String },

})



// TURN INTO A MODULE
const ChatModel = mongoose.model("Chat", chatSchema);


export default ChatModel;

