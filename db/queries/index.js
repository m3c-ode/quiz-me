const { createQuestion } = require("./questions");
const { createAnswer } = require("./answers");
const { createQuiz, deleteQuiz, getQuiz, editQuiz, getAllQuizzes } = require("./quizzes");
const { getUserQuizzes, getUsers } = require("./users");

module.exports = {
  createAnswer,
  createQuestion,
  createQuiz,
  deleteQuiz,
  getQuiz,
  getAllQuizzes,
  editQuiz,
  getUserQuizzes,
  getUsers
};