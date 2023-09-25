const express = require('express');
const router = express.Router();
const { dbQuery } = require('../db/connection');

// GET /api/questions
router.get('/', (req, res) => {
  const queryString = `
    SELECT * FROM questions;
  `;

  dbQuery(queryString)
    .then((data) => {
      const questions = data;
      res.json({ questions });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    }); 
});

// Route to create a new question
router.post('/', (req, res) => {
  const { quiz_id, text } = req.body;

  if (!quiz_id || !text) {
    return res.status(400).json({ error: 'Both quiz_id and text are required fields.' });
  }

  // Create a new question in the database
  const queryString = `
    INSERT INTO questions (quiz_id, text)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const queryParams = [quiz_id, text];

  dbQuery(queryString, queryParams)
    .then((data) => {
      const newQuestion = data[0];
      res.status(201).json({ question: newQuestion });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
