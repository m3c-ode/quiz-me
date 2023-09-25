/*
 * All routes for Attempts Data are defined here
 *
 * NOTE: There is no "EDIT" route here as editing an attempt itself
 * doesn't make sense.  A user might edit a attempt_answer (e.g. if they
 * change their mind), but the attempt itself should never be changed.

 * Since this file is loaded in server.js into api/quizzes,
 *   these routes are mounted onto /api/quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { db, dbQuery } = require("../db/connection");

console.log("WARNING WARNING WARNING");
console.log("WARNING WARNING WARNING");
console.log("WARNING WARNING WARNING");
console.log("USER ID IS HARDCODED IN ATTEMPTS-API - REMOVE BEFORE FINAL USAGE");
console.log("USER ID IS HARDCODED IN ATTEMPTS-API - REMOVE BEFORE FINAL USAGE");
console.log("USER ID IS HARDCODED IN ATTEMPTS-API - REMOVE BEFORE FINAL USAGE");
console.log("USER ID IS HARDCODED IN ATTEMPTS-API - REMOVE BEFORE FINAL USAGE");
console.log("WARNING WARNING WARNING");
console.log("WARNING WARNING WARNING");
console.log("WARNING WARNING WARNING");
const hardcodedUserID = 2;
// DO A FIND/REPLACE FOR "TODO" TO FIND ALL OF THE SPOTS THAT NEED TO BE FIXED

router.get("/", (req, res) => {
  const { user_id } = req.body;

  // TODO: Remove hard coded user id
  const queryParams = [hardcodedUserID];
  // const queryParams = [user_id];

  const queryString = `
  SELECT
    *,
    quizzes.title AS quiz_title,
    questions.text AS question
  FROM
    attempts
  JOIN attempt_answers ON attempts.id = attempt_answers.attempt_id
  JOIN quizzes ON attempts.quiz_id = quizzes.id
  JOIN questions ON attempt_answers.question_id = questions.id
  JOIN answers ON attempt_answers.answer_id = answers.id
  WHERE attempts.user_id = $1
  ORDER BY attempts.TIMESTAMP DESC
  ;`;
  dbQuery(queryString, queryParams)
    .then((data) => {
      console.log("🚀 ~ file: attempts-api.js:53 ~ router.post ~ data:", data);

      let attempts = {};

      data.forEach((attemptAnswer) => {
        if (!attempts.hasOwnProperty(attemptAnswer.attempt_id)) {
          attempts[attemptAnswer.attempt_id] = {};
          attempts[attemptAnswer.attempt_id].answers = [];
          attempts[attemptAnswer.attempt_id].score = 0;
        }

        attempts[attemptAnswer.attempt_id].answers.push(attemptAnswer);

        if (attemptAnswer.is_correct) {
          attempts[attemptAnswer.attempt_id].score++;
        }
      });

      console.log("🚀 ~ file: attempts-api.js:71 ~ js ~ attempts:", attempts);

      res.json({ attempts });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  const { quiz_id, user_id } = req.body;

  // TODO: REMOVE THE HARD CODED LINE
  const queryParams = [1, hardcodedUserID];
  // const queryParams = [quiz_id, user_id];

  // m3: Add the joins later when needed
  const queryString = `
  INSERT INTO attempts (quiz_id, user_id)
  VALUES ($1, $2)
  RETURNING *;
  `;
  dbQuery(queryString, queryParams)
    .then((data) => {
      console.log("🚀 ~ file: attempts-api.js:95 ~ router.post ~ data:", data);
      const attempts = data;
      res.json({ attempts });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  const { user_id } = req.body;

  // TODO: Remove hard coded user id
  const queryParams = [hardcodedUserID, req.params.id];
  // const queryParams = [user_id, req.params.id];

  const queryString = `
  SELECT
    *,
    quizzes.title AS quiz_title,
    questions.text AS question
  FROM
    attempts
  JOIN attempt_answers ON attempts.id = attempt_answers.attempt_id
  JOIN quizzes ON attempts.quiz_id = quizzes.id
  JOIN questions ON attempt_answers.question_id = questions.id
  JOIN answers ON attempt_answers.answer_id = answers.id
  WHERE
    attempts.user_id = $1 AND
    attempts.id = $2;
  `;
  dbQuery(queryString, queryParams)
    .then((data) => {
      console.log("🚀 ~ file: attempts-api.js:128 ~ router.post ~ data:", data);

      let attempt = {};
      attempt.answers = [];
      attempt.score = 0;

      data.forEach((attemptAnswer) => {
        attempt.answers.push(attemptAnswer);

        if (attemptAnswer.is_correct) {
          attempt.score++;
        }
      });

      console.log("🚀 ~ file: attempts-api.js:143 ~ js ~ attempt:", attempt);

      res.json({ attempt });
    })
    .catch((err) => {
      console.log("🚀 ~ file: attempts-api.js:148 ~ router.get ~ err:", err);
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const { user_id } = req.body;

  // TODO: Remove hard coded user id
  const queryParams = [req.params.id, hardcodedUserID];
  // const queryParams = [user_id, req.params.id];

  const queryString = `
  DELETE FROM attempts
  WHERE id = $1 AND user_id = $2
  ;
  `;
  dbQuery(queryString, queryParams)
    .then((data) => {
      console.log(
        "🚀 ~ file: attempts-api.js:168 ~ router.delete ~ data:",
        data
      );
      res.json("Attempt successfully deleted");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
