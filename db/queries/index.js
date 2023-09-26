const { createQuestion } = require("./questions");
const { createAnswer } = require("./answers");
const {
  createQuiz,
  deleteQuiz,
  getQuiz,
  editQuiz,
  getAllQuizzes,
} = require("./quizzes");
const {
  createAttemptAnswer,
  getAttemptAnswer,
  deleteAttemptAnswer,
} = require("./attempt_answers");
const {
  getAllAttemptsForUser,
  startNewAttempt,
  getSpecificAttempt,
  deleteAttempt,
  getQuizWithGroupedAnswers,
} = require("./attempts");

module.exports = {
  createAnswer,
  createQuestion,
  createQuiz,
  deleteQuiz,
  getQuiz,
  getAllQuizzes,
  editQuiz,
  createAttemptAnswer,
  getAttemptAnswer,
  deleteAttemptAnswer,
  getAllAttemptsForUser,
  startNewAttempt,
  getSpecificAttempt,
  deleteAttempt,
  getQuizWithGroupedAnswers,
};
