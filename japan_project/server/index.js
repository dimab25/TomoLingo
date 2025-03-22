import express from "express";
import colors from "colors";
import cors from "cors";
import testRouter from "./routes/testRoute.js";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import moviesRouter from "./routes/moviesRoute.js";
import usersRouter from "./routes/users.Route.js";
import messagesRouter from "./routes/messagesRoute.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";
import moviesCommentRouter from "./routes/movieCommentRoute.js";
import movieWatchlistRouter from "./routes/movieWatchlistRoute.js";
import { createServer } from "node:http";

import morgan from "morgan";
import { Server } from "socket.io";
import ChatModel from "./models/chatMessageModel.js";


// console.log("env variable :>> ", process.env.MONGODB_URI.bgBlue);
const app = express();
const port = process.env.PORT || 4000;

const server = createServer(app);
const io = new Server(server, {
  cors: "http://localhost:5173",
  connectionStateRecovery: {},
});

io.on("connection", async (socket) =>  {
  // console.log('socket.handshake :>> ', socket.handshake.auth);
  // console.log("a user connected");
  // console.log("socket.id :>> ".bgCyan, socket.id);
  socket.on("disconnect", () => {
    // console.log("socket.id disconnected :>> ".bgRed, socket.id);
  });

  socket.on("request messages", async () => {
    try {
      const recoveredMessages = await ChatModel.find({}).sort({ postingDate: -1 }).limit(10);      ; // Fetch all messages in ascending order
      socket.emit("load messages", recoveredMessages.reverse()); // Send messages back to client
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });
  
  //  disconnection
  socket.on("disconnect", (reason) => {
    // console.log(`User ${socket.id} disconnected: ${reason}`);
    if (reason === "transport close" || reason === "ping timeout") {
      console.log("User might reconnect soon..");
    }
  });
  if (socket.recovered) {
    // console.log(`User ${socket.id} reconnected and recovered their session`);
  }
  if (!socket.recovered){
    // console.log(`NewUser ${socket.id} connected`);
    const serverOffset= socket.handshake.auth.serverOffset
    try {
      const recoveredMessages= await ChatModel.find({postingDate : {$gt: serverOffset ?? 0}}).limit(10);

      recoveredMessages.forEach((msg) => {
        socket.emit("chat message", (msg.text, msg.postingDate, msg.author, msg.name, msg.image).reverse())
        
      });
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  socket.on("chat message",async (message) => {
    // console.log("message received".bgGreen, message);
    const author = socket.handshake.auth.author;
    const name = socket.handshake.auth.name
    const image = socket.handshake.auth.image
let createdMessage
try {
  createdMessage= await ChatModel.create({
    text: message,
    author_id: socket.id,
    postingDate: new Date().getTime(),
    author: author,
    name: name,
    image: image,
  })
  
} catch (error) {
  console.error(error.message)
  return;
}
    io.emit("chat message", message, createdMessage.postingDate, author, name, image);
  });
});

function addMiddleWares() {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
  app.use(passport.initialize());
  passport.use(passportStrategy);
  app.use(morgan("dev"));
}

function startServer() {
  // app.listen(port, () => {
  //   console.log("Server is running on " + port + "port");
  // });
  server.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });
}

function loadRoutes() {
  app.use("/api/movies", moviesRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/messages", messagesRouter);
  app.use("/api/movie/comments", moviesCommentRouter);
  app.use("/api/movie/comments", moviesCommentRouter);
  app.use("/api/movie/watchlist", movieWatchlistRouter);
}

async function DBConnetion() {
  try {
    const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URI);
    if (mongoDBConnection) {
      console.log("connected with MongoDB".bgRed);
    }
  } catch (error) {
    console.log("error connecting", error);
  }
}

// IIFE (Immidiatly Invoked Function Expressions)

(async function () {
  await DBConnetion();

  addMiddleWares();
  loadRoutes();
  startServer();
})();
