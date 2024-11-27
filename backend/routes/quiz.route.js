import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  endTest,
  question,
  startTest,
  submitAnswer,
  testHistory,
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/start", verifyToken, startTest);
router.get("/question", verifyToken, question);
router.post("/answer", verifyToken, submitAnswer);
router.post("/endTest", verifyToken, endTest);
router.get("/testHistory", verifyToken, testHistory);

export default router;
