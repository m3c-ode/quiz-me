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
  const queryString = `SELECT * FROM quizzes`;
  console.log(queryString);
  dbQuery(queryString)
    .then(data => {
      const quizzes = data.rows;
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
  const queryString = `
  INSERT INTO quizzes (owner_id, is_public, title)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  console.log(queryString, queryParams);
  dbQuery(queryString, queryParams)
    .then(data => {
      const quizzes = data.rows;
      res.json({ quizzes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
