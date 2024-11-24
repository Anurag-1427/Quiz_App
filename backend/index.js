import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
connectDB(mongoURI);

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
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
