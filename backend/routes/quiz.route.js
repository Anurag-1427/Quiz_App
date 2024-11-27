import express from "express";
import {
  endTest,
  question,
  startTest,
  submitAnswer,
  testHistory,
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/start", startTest);
router.get("/question", question);
router.post("/answer", submitAnswer);
router.post("/endTest", endTest);
router.get("/testHistory", testHistory);

export default router;
