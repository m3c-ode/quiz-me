const express = require('express');
const router = express.Router();
const { dbQuery } = require('../db/connection');
const { authMiddleware } = require('./authentication');
const { route } = require('./users-api');
const axios = require('axios');

const OPENAPI_KEY = process.env.OPENAPI_KEY;
const OPENAPI_URL = "https://api.openai.com/v1/chat/completions";

/**
 * {{role: string, content: string}}
 */
let openaiMessages = [];

const queryOpenAi = async (promptContent) => {
  openaiMessages.push({
    role: 'user',
    content: promptContent
  });
  const response = await axios.post(OPENAPI_URL, {
    model: 'gpt-3.5-turbo',
    messages: openaiMessages,
    temperature: 0.5
  }, {
    headers: {
      'Authorization': `Bearer ${OPENAPI_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  // console.log("🚀 ~ file: questions-api.js:25 ~ queryOpenApi ~ response:", response.data.choices);
  // Ensure you extract the response correctly from the chat model
  const message = response.data.choices[0].message;
  // console.log("🚀 ~ file: questions-api.js:27 ~ queryOpenApi ~ message:", message);
  if (message && message.role === 'assistant') {
    return message.content.trim();
  }
  return '';
};

//TODO: unused routes?

// GET /api/questions
router.get('/', authMiddleware, (req, res) => {
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
router.post('/', authMiddleware, (req, res) => {
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

router.post("/generate",
  // authMiddleware,
  async (req, res) => {
    console.log('body', req.body);
    console.log('Calling GPT');
    const { theme } = req.body;
    try {

      const prompt = `FOLLOW INSTRUCTIONS RELIGIOUSLY.
        From the theme given here: ${theme}.
        Generate a question related to the theme in your answer after the word: 'QUESTION'.
        After generating this QUESTION, please generate 4 potential answers, with only 1 real answer. You can choose to put the right answer randomly between answers position 1 and 4. Make sure to not always choose answer 1 as the correct answer, it needs to change at each request.
        Every time you are prompted, remember which question you asked before, in order to generate a new one. Don't create the same question and answers twice.
        After 'CORRECT ANSWER: ', just input the number of the answer, not the content.
        Please format your response in this format:
        QUESTION
        <your question generated>
        ANSWERS
        1. <example answer 1>
        2. <example answer 2>
        3. <example answer 3>
        4. <example answer 4>
        CORRECT ANSWER: <number of the answer that is correct>.
        "`;
      // request to GPT for the category
      const question = await queryOpenAi(prompt);
      console.log("🚀 ~ file: questions-api.js:103 ~ question:", question);
      openaiMessages.push({
        role: 'assistant',
        content: question
      });

      res.json({
        question
        // removeQuotationMarks(question)

      });

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Failed to get question' });
    }
  }
);

// Route to get a question by ID
router.get('/:id', authMiddleware, (req, res) => {
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
router.patch('/:id', authMiddleware, (req, res) => {
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

// Route to delete a question by ID
router.delete('/:id', authMiddleware, (req, res) => {
  const questionId = req.params.id;

  // Delete the question from the database
  const queryString = `
    DELETE FROM questions
    WHERE id = $1
  `;

  const queryParams = [questionId];

  dbQuery(queryString, queryParams)
    .then(() => {
      res.status(204).end(); // 204 No Content for successful deletion
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});



module.exports = router;
