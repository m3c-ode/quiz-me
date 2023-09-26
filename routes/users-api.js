/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getUserQuizzes, getUsers } = require('../db/queries');

// Protected route for admins? Necessary?
router.get('/', (req, res) => {
  getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// GET user's quizzes
router.get("/:id/quizzes", (req, res) => {
  const userQueryParams = [req.params.id];
  getUserQuizzes(userQueryParams)
    .then(userQuizzes => {
      if (userQuizzes.length === 0) {
        return res.status(404).json({ message: "Resource Not found" });
      }
      res.json({ userQuizzes });
    })
    .catch(err => {
      console.log("🚀 ~ file: quizzes-api.js:81 ~ router.get ~ err:", err);
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
