/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getUserQuizzes, getUsers, getUserInfo } = require('../db/queries');

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

// GET /users/me -> gets logged-in user info
// TODO: implement when session auth is implemented
router.get("/me", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ message: "not logged in" });
  }
  getUserInfo([userId])
    .then(data => res.json({ user: data[0] }))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// GET /users/:id -> gets logged-in user info
// TODO: temporary while no auth implemented
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.send({ message: "not logged in" });
  }
  getUserInfo([userId])
    .then(data => {
      console.log("🚀 ~ file: users-api.js:50 ~ router.get ~ data:", data);
      res.json({ user: data[0] });
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
