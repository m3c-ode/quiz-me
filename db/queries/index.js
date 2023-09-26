const { createQuestion } = require("./questions");
const { createAnswer } = require("./answers");
const {
  createQuiz,
  deleteQuiz,
  getQuiz,
  editQuiz,
  getAllPublicQuizzes
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
} = require("./attempts");

const { getUserQuizzes, getUsers } = require("./users");


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
