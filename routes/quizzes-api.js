/*
 * All routes for Quizz Data are defined here
 * Since this file is loaded in server.js into api/quizzes,
 *   these routes are mounted onto /api/quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { db, dbQuery } = require('../db/connection');

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
  dbQuery(queryString)
    .then(data => {
      const quizzes = data;
      res.json({ quizzes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const { owner_id, is_public, title } = req.body;
  const queryParams = [owner_id, is_public, title];
  // m3: Add the joins later when needed
  const queryString = `
  INSERT INTO quizzes (owner_id, is_public, title)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  dbQuery(queryString, queryParams)
    .then(data => {
      console.log("🚀 ~ file: quizzes-api.js:38 ~ router.post ~ data:", data);
      const quizzes = data;
      res.json({ quizzes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
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
  WHERE quizzes.id=$1
  GROUP BY quizzes.id, questions.id, answers.id
  `;
  const queryParams = [req.params.id];
  dbQuery(queryString, queryParams)
    .then(data => {
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

router.delete('/:id', (req, res) => {
  const queryString = `
  DELETE FROM quizzes
  WHERE id=$1
  ;
  `;
  const queryParams = [req.params.id];
  dbQuery(queryString, queryParams)
    .then(data => {
      const quizzes = data[0];
      res.json("Entry successfully deleted");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.put('/:id', (req, res) => {
  const queryString = `
  UPDATE quizzes
  SET owner_id = $1, is_public=$2, title=$3
  WHERE id=$4
  RETURNING *
  ;
  `;
  const { owner_id, is_public, title } = req.body;
  const queryParams = [owner_id, is_public, title, req.params.id];

  console.log(queryString);
  dbQuery(queryString, queryParams)
    .then(data => {
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
