import User from "../models/user.model.js";
import TestHistory from "../models/tesHistory.model.js";

// const questionBank = [
//   {
//     id: 1,
//     type: "text",
//     question: "Solve for x: 2x + 3 = 7",
//     answer: 2,
//     options: null,
//     difficulty: 1.5,
//     discrimination: 0.8,
//     guessing: 0.1,
//   },
//   {
//     id: 2,
//     type: "multiple-choice",
//     question: "Simplify: (x + 2)(x - 3)",
//     options: ["x^2 + 6", "x^2 - x - 6", "x^2 + x - 6", "x^2 - 6"],
//     answer: "x^2 - x - 6",
//     difficulty: 2.0,
//     discrimination: 1.0,
//     guessing: 0.25,
//   },
//   {
//     id: 3,
//     type: "multiple-choice",
//     question: "Solve for x: x^2 - 4 = 0",
//     options: ["2", "-2", "±2", "None"],
//     answer: "±2",
//     difficulty: 2.5,
//     discrimination: 1.2,
//     guessing: 0.25,
//   },
//   {
//     id: 4,
//     type: "text",
//     question: "Expand: (2x + 3)^2",
//     answer: "4x^2 + 12x + 9",
//     options: null,
//     difficulty: 3.0,
//     discrimination: 1.5,
//     guessing: 0.1,
//   },
// ];

const questionBank = [
  {
    id: 1,
    type: "text",
    question: "Solve for x: 2x + 3 = 7",
    answer: 2,
    options: null,
    difficulty: 1.5,
    discrimination: 0.8,
    guessing: 0.1,
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Simplify: (x + 2)(x - 3)",
    options: ["x^2 + 6", "x^2 - x - 6", "x^2 + x - 6", "x^2 - 6"],
    answer: "x^2 - x - 6",
    difficulty: 2.0,
    discrimination: 1.0,
    guessing: 0.25,
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "Solve for x: x^2 - 4 = 0",
    options: ["2", "-2", "±2", "None"],
    answer: "±2",
    difficulty: 2.5,
    discrimination: 1.2,
    guessing: 0.25,
  },
  {
    id: 4,
    type: "text",
    question: "Expand: (2x + 3)^2",
    answer: "4x^2 + 12x + 9",
    options: null,
    difficulty: 3.0,
    discrimination: 1.5,
    guessing: 0.1,
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "What is the derivative of x^2?",
    options: ["x", "2x", "x^2", "2x^2"],
    answer: "2x",
    difficulty: 2.0,
    discrimination: 1.0,
    guessing: 0.2,
  },
  {
    id: 6,
    type: "text",
    question: "Solve for x: 3x - 7 = 2x + 5",
    answer: 12,
    options: null,
    difficulty: 2.0,
    discrimination: 1.2,
    guessing: 0.15,
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "Which of the following is the quadratic formula?",
    options: [
      "x = (-b ± √(b^2 - 4ac)) / 2a",
      "x = (-b ± √(b^2 + 4ac)) / 2a",
      "x = (b ± √(a^2 - 4ac)) / 2a",
      "x = (b ± √(a^2 + 4ac)) / 2b",
    ],
    answer: "x = (-b ± √(b^2 - 4ac)) / 2a",
    difficulty: 3.0,
    discrimination: 1.0,
    guessing: 0.3,
  },
  {
    id: 8,
    type: "text",
    question: "Factorize: x^2 - 5x + 6",
    answer: "(x - 2)(x - 3)",
    options: null,
    difficulty: 1.5,
    discrimination: 0.9,
    guessing: 0.1,
  },
  {
    id: 9,
    type: "multiple-choice",
    question: "Solve for x: x^2 + 6x + 9 = 0",
    options: ["x = -3", "x = 3", "x = ±3", "No solution"],
    answer: "x = -3",
    difficulty: 2.0,
    discrimination: 1.1,
    guessing: 0.2,
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "Simplify: 3x^2 - 2x + 4x^2 + 5x",
    options: ["7x^2 + 3x", "7x^2 + 7x", "3x^2 + 7x", "3x^2 + 5x"],
    answer: "7x^2 + 7x",
    difficulty: 1.8,
    discrimination: 0.8,
    guessing: 0.15,
  },
  {
    id: 11,
    type: "text",
    question: "Solve for x: 2x^2 - 3x - 5 = 0",
    answer: ["1", "-5/2"],
    options: null,
    difficulty: 3.0,
    discrimination: 1.3,
    guessing: 0.2,
  },
  {
    id: 12,
    type: "multiple-choice",
    question: "What is the integral of x?",
    options: ["x^2", "x", "x^3/3", "x^2/2"],
    answer: "x^2/2",
    difficulty: 2.5,
    discrimination: 1.1,
    guessing: 0.3,
  },
  {
    id: 13,
    type: "text",
    question:
      "Find the sum of the first 10 terms of the arithmetic sequence 2, 5, 8, ...",
    answer: 140,
    options: null,
    difficulty: 3.0,
    discrimination: 1.4,
    guessing: 0.2,
  },
  {
    id: 14,
    type: "multiple-choice",
    question: "Solve for x: 4x^2 - 12x + 9 = 0",
    options: ["x = 3/2", "x = -3/2", "x = 3", "x = -3"],
    answer: "x = 3/2",
    difficulty: 2.0,
    discrimination: 1.1,
    guessing: 0.25,
  },
  {
    id: 15,
    type: "multiple-choice",
    question: "What is the value of sin(45°)?",
    options: ["√2/2", "1/2", "√3/2", "1"],
    answer: "√2/2",
    difficulty: 1.5,
    discrimination: 0.9,
    guessing: 0.1,
  },
  {
    id: 16,
    type: "text",
    question: "Solve for x: 5x^2 + 6x - 7 = 0",
    answer: "(-6 ± √(36 + 140)) / 10",
    options: null,
    difficulty: 3.5,
    discrimination: 1.4,
    guessing: 0.25,
  },
  {
    id: 17,
    type: "multiple-choice",
    question: "Simplify: (x^3 - 2x^2) / x^2",
    options: ["x - 2", "x^3 - 2x", "x - 2/x", "x - 2/x^2"],
    answer: "x - 2",
    difficulty: 2.0,
    discrimination: 1.0,
    guessing: 0.2,
  },
  {
    id: 18,
    type: "text",
    question: "Find the area of a triangle with base 6 and height 8.",
    answer: 24,
    options: null,
    difficulty: 1.5,
    discrimination: 0.8,
    guessing: 0.1,
  },
  {
    id: 19,
    type: "multiple-choice",
    question: "What is the derivative of sin(x)?",
    options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"],
    answer: "cos(x)",
    difficulty: 2.5,
    discrimination: 1.2,
    guessing: 0.3,
  },
  {
    id: 20,
    type: "multiple-choice",
    question: "Solve for x: 3x^2 - 4x - 5 = 0",
    options: ["x = -1", "x = 5/3", "x = 1/3", "x = -5/3"],
    answer: "x = 5/3",
    difficulty: 2.5,
    discrimination: 1.1,
    guessing: 0.2,
  },
];

const calculateProbability = (theta, a, b, c) => {
  return c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
};

const getNextQuestion = (theta, answeredQuestions) => {
  const remainingQuestions = questionBank.filter(
    (q) => !answeredQuestions.includes(q.id)
  );

  let bestQuestion = null;
  let maxInformation = -Infinity;

  for (const question of remainingQuestions) {
    const { difficulty: b, discrimination: a, guessing: c } = question;
    const P = calculateProbability(theta, a, b, c);
    const Q = 1 - P;
    const information = a ** 2 * P * Q;

    if (information > maxInformation) {
      maxInformation = information;
      bestQuestion = question;
    }
  }

  return bestQuestion;
};

export const startTest = async (req, res, next) => {
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    // let user = await User.findOne({ _id: userId });
    // if (!user) {
    //   user = new User({ userId });
    //   await user.save();
    // }

    res.json({ message: "Test started" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const question = async (req, res, next) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ error: "Invalid user session" });

    const nextQuestion = getNextQuestion(user.ability, user.answeredQuestions);

    if (!nextQuestion)
      return res.json({ message: "Test complete", ability: user.ability });

    res.json(nextQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submitAnswer = async (req, res, next) => {
  const { userId, questionId, answer } = req.body;
  if (!userId || !questionId || answer == null)
    return res.status(400).json({ error: "Invalid input" });

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ error: "Invalid user session" });

    const question = questionBank.find((q) => q.id === questionId);
    if (!question)
      return res.status(400).json({ error: "Invalid question ID" });

    const { difficulty: b, discrimination: a, guessing: c } = question;
    const P = calculateProbability(user.ability, a, b, c);

    const isCorrect = Array.isArray(question.answer)
      ? question.answer.includes(answer)
      : question.answer === answer;

    if (isCorrect) {
      user.ability += a * (1 - P);
      user.correctAnswers += 1;
    } else {
      user.ability -= a * P;
      user.incorrectAnswers += 1;
    }

    user.answeredQuestions.push(questionId);
    await user.save();

    res.json({ message: "Answer submitted", ability: user.ability });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const endTest = async (req, res, next) => {
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ error: "Invalid user session" });

    const testStats = {
      userId,
      ability: user.ability,
      correctAnswers: user.correctAnswers,
      incorrectAnswers: user.incorrectAnswers,
      totalQuestions: user.answeredQuestions.length,
    };

    const testHistory = new TestHistory(testStats);
    await testHistory.save();

    user.ability = 2.5;
    user.answeredQuestions = [];
    user.correctAnswers = 0;
    user.incorrectAnswers = 0;
    await user.save();

    res.json({ message: "Test complete. Statistics saved.", testStats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const testHistory = async (req, res, next) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    const history = await TestHistory.find({ userId });
    if (!history)
      return res.status(404).json({ error: "No test history found" });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
