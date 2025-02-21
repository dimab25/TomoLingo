import express from "express";
import colors from "colors";
import cors from "cors";
import testRouter from "./routes/testRoute.js";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

console.log("env variable :>> ", process.env.MONGODB_URI.bgBlue);

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

app.use("/api", testRouter);

async function main() {
  try {
    const mongoDBConnection = await mongoose.connect(
      process.env.MONGODB_URI,
      "connected with mongobd".bgBlue
    );
    if (mongoDBConnection) {
      console.log("connected with MongoDB".bgRed);
    }
  } catch (error) {
    console.log("error connecting", error);
  }
}

main();
