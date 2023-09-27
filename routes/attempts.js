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
const {
  startNewAttempt,
  deleteAttempt
} = require('../db/queries/index');

const hardcodedUserID = 2;

router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  let user = req.session.user.id;

  if (!user) {
    user = undefined;
  }
  // Else: fetch the user info
  res.render("attempts", { user });
});

router.post("/", (req, res) => {
  const user = req.session.user.id;
  const { quiz_id } = req.body;

  // Set some default data
  let queryParams = [1, hardcodedUserID];

  if (quiz_id && user) {
    // Real data was sent so replace the fake data with the actual
    queryParams = [quiz_id, user];
  }

  startNewAttempt(queryParams)
    .then((data) => {
      console.log("🚀 ~ file: attempts-api.js:80 ~ router.post ~ data:", data);
      const attempts = data;
      res.json({ attempts });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  let user = req.session.user.id;

  if (!user) {
    user = undefined;
  }

  res.render("attempt", { user });
});

router.delete("/:id", (req, res) => {
  const user = req.session.user.id;

  // Set some default data
  let queryParams = [req.params.id, hardcodedUserID];

  if (user) {
    // Real data was sent so replace the fake data with the actual
    queryParams = [user, req.params.id];
  }

  deleteAttempt(queryParams)
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
