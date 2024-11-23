import mongoose from "mongoose";
import { DB_NAME } from "../constants/constants.js";

const connectDB = (uri) => {
  mongoose
    .connect(uri, {
      dbName: DB_NAME,
    })
    .then((data) => {
      console.log(`Connected to DB: ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

export { connectDB };
