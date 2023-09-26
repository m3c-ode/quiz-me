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
  getAllAttemptsForUser,
  startNewAttempt,
  getSpecificAttempt,
  deleteAttempt,
  getQuizWithGroupedAnswers,
  getNumberOfQuestionsForQuiz,
} = require("../db/queries");

const hardcodedUserID = 2;

router.get("/", (req, res) => {
  const { user_id } = req.body;

  // Set default data
  let queryParams = [hardcodedUserID];

  if (user_id) {
    // Real data was sent so replace the fake data with the actual
    queryParams = [user_id];
  }

  getAllAttemptsForUser(queryParams)
    .then((data) => {
      console.log("🚀 ~ file: attempts-api.js:40 ~ router.post ~ data:", data);

      getNumberOfQuestionsForQuiz(data[0].quiz_id).then((questions) => {
        let attemptsObj = {};

        data.forEach((attemptAnswer) => {
          if (!attemptsObj.hasOwnProperty(attemptAnswer.attempt_id)) {
            attemptsObj[attemptAnswer.attempt_id] = {};
            attemptsObj[attemptAnswer.attempt_id].attempt_id =
            attemptAnswer.attempt_id;
            attemptsObj[attemptAnswer.attempt_id].quiz_title = data[0].quiz_title;
            attemptsObj[attemptAnswer.attempt_id].quiz_id = data[0].quiz_id;
            attemptsObj[attemptAnswer.attempt_id].answers = [];
            attemptsObj[attemptAnswer.attempt_id].score = 0;
            attemptsObj[attemptAnswer.attempt_id].total_possible_score = Number(questions[0].count);
          }

          attemptsObj[attemptAnswer.attempt_id].answers.push(attemptAnswer);

          if (attemptAnswer.is_correct) {
            attemptsObj[attemptAnswer.attempt_id].score++;
          }
        });


        let attempts = [];
        for (let attempt in attemptsObj) {
          attempts.push(attemptsObj[attempt]);
        }

        console.log("🚀 ~ file: attempts-api.js:71 ~ js ~ attempts:", attempts);

        res.json({ attempts });

      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  const { quiz_id, user_id } = req.body;

  // Set some default data
  let queryParams = [1, hardcodedUserID];

  if (quiz_id && user_id) {
    // Real data was sent so replace the fake data with the actual
    queryParams = [quiz_id, user_id];
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
  const { user_id } = req.body;

  // Set some default data
  const queryParams = [hardcodedUserID, req.params.id];

  if (user_id) {
    // Real data was sent so replace the fake data with the actual
    queryParams = [user_id, req.params.id];
  }

  getSpecificAttempt(queryParams)
    .then((data) => {
      console.log("🚀 ~ file: attempts-api.js:98 ~ router.post ~ data:", data);

      let attempt = {};
      attempt.answers = [];
      attempt.score = 0;

      data.forEach((attemptAnswer) => {
        attempt.answers.push(attemptAnswer);
        attempt.quiz_title = attemptAnswer.quiz_title;
        attempt.quiz_id = attemptAnswer.quiz_id;

        if (attemptAnswer.is_correct) {
          attempt.score++;
        }
      });

      let quizParams = [attempt.quiz_id];
      getQuizWithGroupedAnswers(quizParams).then((answers) => {
        let questions = [];
        let score = 0;
        let quiz_title = "";
        let quiz_id = attempt.quiz_id;

        answers.forEach((answer) => {
          quiz_title = answer.title;

          // Create the template of a question
          let question = {
            id: answer.question_id,
            text: answer.question,
            user_guessed_right: false,
            answers: [],
          };

          // If this question doesn't exist in our list of known questions, add it
          if (!questions.some((q) => q.id === answer.question_id)) {
            questions.push(question);
          }

          // Since they are not ordered, find the question that we either
          // just created or that was created earlier
          let findQuestion = questions.find((q) => q.id === answer.question_id);
          findQuestion.answers.push(answer);

          // First we assume the user didn't choose this option
          answer.user_chose = false;

          attempt.answers.forEach((attemptedAnswer) => {
            // The user actually DID choose this option
            if (answer.answer_id === attemptedAnswer.answer_id) {
              // Flag it on the object
              answer.user_chose = true;
              if (answer.is_correct) {
                // And if it's right answer, increase their score
                score++;
                // And note it on the question
                findQuestion.user_guessed_right = true;
              }
            }
          });
        });

        let question_count = questions.length;

        res.json({ quiz_id, quiz_title, score, question_count, questions });
      });
    })
    .catch((err) => {
      console.log("🚀 ~ file: attempts-api.js:117 ~ router.get ~ err:", err);
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const { user_id } = req.body;

  // Set some default data
  const queryParams = [req.params.id, hardcodedUserID];

  if (user_id) {
    // Real data was sent so replace the fake data with the actual
    queryParams = [user_id, req.params.id];
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
