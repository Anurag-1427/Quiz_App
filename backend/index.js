import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
connectDB(mongoURI);

const app = express();

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
