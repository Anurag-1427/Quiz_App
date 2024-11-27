import mongoose from "mongoose";

const testHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  ability: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  incorrectAnswers: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
});

const TestHistory = mongoose.model("TestHistory", testHistorySchema);

export default TestHistory;
