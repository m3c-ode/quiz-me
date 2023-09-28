/*
 * All routes for Quizzes pages are defined here
 *
 * NOTE: There is no "EDIT" route here as editing an attempt itself
 * doesn't make sense.  A user might edit a attempt_answer (e.g. if they
 * change their mind), but the attempt itself should never be changed.

 * Since this file is loaded in server.js into views/quizzes,
 *   these routes are mounted onto /quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const { authRedirectMiddleware } = require("./authentication");
const router = express.Router();

const hardcodedUserID = 1;

router.get("/", authRedirectMiddleware, (req, res) => {
  let user = req.session.user;
  // Else: fetch the user info
  res.render("quizzes", { user });
});

router.get("/new", authRedirectMiddleware, (req, res) => {
  let user = req.session.user;
  // Else: fetch the user info
  res.render("new-quiz", { user });
});


// TODO: Not in use?
// router.post("/", (req, res) => {
//   // const { quiz_id, user_id } = req.body;
//   console.log("🚀 ~ file: quizzes.js:50 ~ router.post ~ req.body:", req.body);

//   // Set some default data
//   let queryParams = [1, hardcodedUserID];

//   if (quiz_id && user_id) {
//     // Real data was sent so replace the fake data with the actual
//     queryParams = [quiz_id, user_id];
//   }

//   // startNewAttempt(queryParams)
//   //   .then((data) => {
//   //     console.log("🚀 ~ file: attempts-api.js:80 ~ router.post ~ data:", data);
//   //     const attempts = data;
//   //     res.json({ attempts });
//   //   })
//   //   .catch((err) => {
//   //     res.status(500).json({ error: err.message });
//   //   });
// });

router.get('/:id/take', authRedirectMiddleware, (req, res) => {
  const user = req.session.user;
  const quiz_id = req.params.id;

  if (!req.session.user) {
    return res.redirect('/');
  }

  return res.render('take', { user, quiz_id });
});

router.get("/:id", (req, res) => {
  let user = req.session.user;

  res.render("quiz", { user });
});

// TODO: Not in USE?
// router.delete("/:id", (req, res) => {
//   const { user_id } = req.body;

//   // Set some default data
//   const queryParams = [req.params.id, hardcodedUserID];

//   if (user_id) {
//     // Real data was sent so replace the fake data with the actual
//     queryParams = [user_id, req.params.id];
//   }

//   deleteAttempt(queryParams)
//     .then((data) => {
//       console.log(
//         "🚀 ~ file: attempts-api.js:168 ~ router.delete ~ data:",
//         data
//       );
//       res.json("Attempt successfully deleted");
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

module.exports = router;
