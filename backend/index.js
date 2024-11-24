import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
