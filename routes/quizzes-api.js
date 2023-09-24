/*
 * All routes for Quizz Data are defined here
 * Since this file is loaded in server.js into api/quizzes,
 *   these routes are mounted onto /api/quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { db, dbQuery } = require('../db/connection');
const { createQuestion, createAnswer, createQuiz, deleteQuiz, getQuiz, editQuiz, getAllQuizzes } = require("../db/queries");
const { handleNotFound } = require('../lib/middlewares');

router.get('/', (req, res) => {
  const queryString = `
  SELECT
  quizzes.id AS quiz_id,
  quizzes.title AS quiz_title,
  questions.text AS question,
  answers.text AS answer,
  answers.is_correct
  FROM quizzes
  JOIN questions ON quizzes.id = questions.quiz_id
  JOIN answers ON questions.id = answers.question_id
  GROUP BY quizzes.id, questions.id, answers.id
  ORDER BY quiz_id, questions.id, answers.is_correct DESC
  ;`;
  // dbQuery(queryString)
  getAllQuizzes()
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({ message: "Quizzes Not found" });
      }
      const quizzes = data;
      res.json({ quizzes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// m3: Insert all the questions and answers in appropriate tables as well.
router.post('/', (req, res) => {
  // m3: note for frontend: send quizz in "quizz" object so that req.body.quizz...
  const { owner_id, is_public, title } = req.body.quizz;
  const quizzParams = [owner_id, is_public, title];
  createQuiz(quizzParams)
    .then(quizzData => {
      quiz_id = quizzData[0].id;
      const questions = req.body.questions;
      for (const question of questions) {
        const questionText = question.text;
        const questionParams = [quiz_id, questionText];
        createQuestion(questionParams)
          .then(questionData => {
            //  m3: Had an error here (because returning data.rows in createQuestion instead of data, but it was not caught: why?)
            const question_id = questionData[0].id;
            const answers = question.answers;
            for (const answer of answers) {
              const answerParam = [question_id, answer.text, answer.is_correct];
              createAnswer(answerParam)
                .then(answerData => console.log("added answer: ", answerData));
            }
          });
      }
      res.status(201).json({ quizzData });
    })
    .catch(err => {
      console.log("🚀 ~ file: quizzes-api.js:66 ~ router.post ~ err:", err);
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const queryParams = [req.params.id];
  getQuiz(queryParams)
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({ message: "Quizz Not found" });
      }
      console.log("🚀 ~ file: quizzes-api.js:77 ~ router.get ~ data:", data);
      const quizzes = data;
      res.json({ quizzes });
    })
    .catch(err => {
      console.log("🚀 ~ file: quizzes-api.js:81 ~ router.get ~ err:", err);
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.delete('/:id', (req, res, next) => {
  const queryParams = [req.params.id];
  deleteQuiz(queryParams)
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({ message: "Quizz Not found" });
      }
    })
    .catch(err => {
      console.log("🚀 ~ file: quizzes-api.js:124 ~ router.delete ~ err:", err);
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.put('/:id', (req, res) => {
  const { owner_id, is_public, title } = req.body;
  const queryParams = [owner_id, is_public, title, req.params.id];
  editQuiz(queryParams)
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({ message: "Quizz Not found" });
      }
      const quizzes = data[0];
      res.json({ quizzes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
