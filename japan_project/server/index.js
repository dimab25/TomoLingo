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

// console.log("env variable :>> ", process.env.MONGODB_URI.bgBlue);
const app = express();
const port = process.env.PORT || 4000;
function addMiddleWares() {
  
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig ();

}

function startServer() {
  app.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });
}

function loadRoutes() {
  app.use("/api/movies", moviesRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/messages", messagesRouter);
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
