/*
 * All routes for Quizz Data are defined here
 * Since this file is loaded in server.js into api/quizzes,
 *   these routes are mounted onto /api/quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { db, dbQuery } = require('../db/connection');
const { createQuestion, createAnswer, createQuiz, deleteQuiz, getQuiz, editQuiz, getAllPublicQuizzes, getQuizQuestionsAndAnswers } = require("../db/queries");
const { handleNotFound } = require('../lib/middlewares');
const { authMiddleware } = require('./authentication');
const util = require('util');

// Filter for private - all public quizzes
router.get('/', (req, res) => {
  getAllPublicQuizzes()
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
router.post('/', authMiddleware, (req, res) => {
  // m3: note for frontend: send quizz in "quizz" object so that req.body.quizz...

  console.log('quizzes post req.body', req.body);

  console.log('req.session', req.session);

  const questionsData = [];

  Object.keys(req.body).forEach(key => {
    if (key.startsWith('question')) {
      const questionNumber = Number(key.replace('question', ''));
      const question = {
        text: req.body[key][0],
        answers: []
      };
      // iterate through 4 possible answers per question
      for (let i = 1; i <= 4; i++) {
        const answerKey = `answer${i}`;
        question.answers.push({
          text: req.body[answerKey][questionNumber - 1],
          is_correct: answerKey === req.body[key][1]
        });
      }
      questionsData.push(question);
    }
  });
  // const answersData

  console.log("🚀 ~ file: quizzes-api.js:40 ~ router.post ~ questionsData:", util.inspect(questionsData, { depth: 3, colors: true }));


  const formattedBodyData = {
    quiz: {
      owner_id: req.session.user.id,
      is_public: req.body.is_public === 'true' ? true : false,
      title: req.body.title
    },
    questions: questionsData
  };
  console.log("🚀 ~ file: quizzes-api.js:49 ~ router.post ~ bodyData:", util.inspect(formattedBodyData, { depth: 4, colors: true }));

  const { owner_id, is_public, title } = formattedBodyData.quiz;
  const quizParams = [owner_id, is_public, title];
  createQuiz(quizParams)
    .then(quizData => {
      quiz_id = quizData[0].id;
      const questions = formattedBodyData.questions;
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
        // .catch(err => {
        //   console.log("🚀 ~ file: quizzes-api.js:68 ~ router.post ~ err:", err);
        //   return res
        //     .status(500)
        //     .json({ error: err.message });
        // });
      }
      // res.status(201).json({ quizData });
      res.status(201).json({ quizData });
    })
    .catch(err => {
      console.log("🚀 ~ file: quizzes-api.js:77 ~ router.post ~ err:", err);
      return res
        .status(500)
        .json({ error: err.message });
    });
});

// GET single quizz
router.get('/:id', authMiddleware, (req, res) => {
  const queryParams = [req.params.id];
  getQuiz(queryParams)
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({ message: "Quizz Not found" });
      }
      // Gets quizz with all the information in it (including questions and answers)
      const quizz = data;
      res.json({ quizz });
    })
    .catch(err => {
      console.log("🚀 ~ file: quizzes-api.js:81 ~ router.get ~ err:", err);
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.delete('/:id', authMiddleware, (req, res, next) => {
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

router.put('/:id', authMiddleware, (req, res) => {
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
