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

// const chatSchema = new mongoose.Schema({
//     users: { type: [String], required: true }, // Array of user IDs
//     messages: { type: [messageSchema], default: [] }, // Embedded messages
//     createdAt: { type: Number, default: Date.now } // Timestamp
//   });

// TURN INTO A MODULE
const ChatModel = mongoose.model("Chat", chatSchema);
// const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;
// export {ChatModel};
