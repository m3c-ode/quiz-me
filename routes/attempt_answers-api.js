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
const hardcoded_attempt_id = 2;
// DO A FIND/REPLACE FOR "TODO" TO FIND ALL OF THE SPOTS THAT NEED TO BE FIXED

router.post("/", (req, res) => {
  const { attempt_id, question_id, answer_id } = req.body;

  // TODO: REMOVE THE HARD CODED LINE
  const queryParams = [hardcoded_attempt_id, 3, 11];
  // const queryParams = [answer_id, attempt_id];

  // m3: Add the joins later when needed
  const queryString = `
  INSERT INTO attempt_answers (attempt_id, question_id, answer_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  dbQuery(queryString, queryParams)
    .then((data) => {
      console.log(
        "🚀 ~ file: attempt_answers-api.js:46 ~ router.post ~ data:",
        data
      );
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
  const queryParams = [hardcoded_attempt_id, req.params.id];
  // const queryParams = [user_id, req.params.id];

  const queryString = `
  SELECT
    *
  FROM
    attempt_answers
  LEFT JOIN attempts ON attempts.id = attempt_answers.attempt_id
  WHERE
    attempts.user_id = $1 AND
    attempt_answers.id = $2;
  `;
  dbQuery(queryString, queryParams)
    .then((data) => {
      console.log(
        "🚀 ~ file: attempt_answers.api.js:96 ~ router.get ~ data:",
        data
      );
      const attempts = data;
      res.json({ attempts });
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: attempt_answers.api.js:101 ~ router.get ~ err:",
        err
      );
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const { user_id } = req.body;

  // TODO: Remove hard coded user id
  const queryParams = [req.params.id, hardcoded_attempt_id];
  // const queryParams = [user_id, req.params.id];

  const queryString = `
  DELETE FROM attempts
  WHERE id = $1 AND user_id = $2
  ;
  `;
  dbQuery(queryString, queryParams)
    .then((data) => {
      console.log(
        "🚀 ~ file: attempt_answers.api.js:131 ~ router.delete ~ data:",
        data
      );
      res.json("Attempt successfully deleted");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
