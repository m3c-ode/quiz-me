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

// Route to get a question by ID
router.get('/:id', (req, res) => {
  const questionId = req.params.id;

  // Query the database to retrieve the question
  const queryString = `
    SELECT * FROM questions
    WHERE id = $1;
  `;

  const queryParams = [questionId];

  dbQuery(queryString, queryParams)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ error: 'Question not found.' });
      }

      const question = data[0];
      res.json({ question });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route to update a question by ID
router.patch('/:id', (req, res) => {
  const questionId = req.params.id;
  const { text } = req.body;

  // Validate questionId and text, and handle errors if needed
  if (!/^\d+$/.test(questionId) || parseInt(questionId) <= 0) {
    return res.status(400).json({ error: 'Invalid question ID.' });
  }

  if (!text) {
    return res.status(400).json({ error: 'Text is required for updating the question.' });
  }

  // Update the question in the database
  const queryString = `
    UPDATE questions
    SET text = $1
    WHERE id = $2
    RETURNING *;
  `;

  const queryParams = [text, questionId];

  dbQuery(queryString, queryParams)
    .then((data) => {
      const updatedQuestion = data[0];
      if (!updatedQuestion) {
        return res.status(404).json({ error: 'Question not found.' });
      }
      res.json({ question: updatedQuestion });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;
