const { createQuestion } = require("./questions");
const { createAnswer } = require("./answers");
const { createQuiz, deleteQuiz, getQuiz, editQuiz, getAllPublicQuizzes } = require("./quizzes");
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
  getUsers
};