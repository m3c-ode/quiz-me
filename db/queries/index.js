const { createQuestion } = require("./questions");
const { createAnswer } = require("./answers");
const { createQuiz, deleteQuiz, getQuiz, editQuiz, getAllPublicQuizzes } = require("./quizzes");
const { getUserQuizzes, getUsers } = require("./users");
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
} = require("./attempts");

module.exports = {
  createAnswer,
  createQuestion,
  createQuiz,
  deleteQuiz,
  getQuiz,
  getAllPublicQuizzes,
  editQuiz,
  getUserQuizzes,
  getUsers,
  createAttemptAnswer,
  getAttemptAnswer,
  deleteAttemptAnswer,
  getAllAttemptsForUser,
  startNewAttempt,
  getSpecificAttempt,
  deleteAttempt,
};
