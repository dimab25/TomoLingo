import mongoose from "mongoose";
// DEFINE SCHEMA
const messageSchema = mongoose.Schema({

  from_id: { require: true, type: String },
  to_id: { require: true, type: String },
   message:{ require: true, type: String },
  from_name:{ require: true, type: String },
  to_name:{ require: true, type: String },
},{timestamps: {createdAt: "created_at"}})

const messagesSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], // Array of user IDs
    messages: { type: [messageSchema], default: [] }, // Embedded messages
    // createdAt: { type: Number, default: Date.now } // Timestamp
  });

// TURN INTO A MODULE
const MessagesModel = mongoose.model("Message", messagesSchema);

export default MessagesModel;
