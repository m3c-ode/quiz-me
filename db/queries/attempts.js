const { dbQuery } = require("../connection");

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const getAllAttemptsForUser = (queryParams) => {
  const answerQuery = `
  SELECT
    *,
    quizzes.title AS quiz_title
  FROM
    attempts
  JOIN attempt_answers ON attempts.id = attempt_answers.attempt_id
  JOIN quizzes ON attempts.quiz_id = quizzes.id
  JOIN answers ON attempt_answers.answer_id = answers.id
  WHERE attempts.user_id = $1
  ORDER BY attempts.TIMESTAMP DESC
    ;`;
  return dbQuery(answerQuery, queryParams).then((data) => data);
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const startNewAttempt = (queryParams) => {
  const answerQuery = `
    INSERT INTO attempts (quiz_id, user_id)
    VALUES ($1, $2)
    RETURNING *
    ;`;
  return dbQuery(answerQuery, queryParams).then((data) => data);
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const getSpecificAttempt = (queryParams) => {
  const answerQuery = `
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
    ;`;
  return dbQuery(answerQuery, queryParams).then((data) => data);
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const getQuizWithGroupedAnswers = (queryParams) => {
  const queryString = `
    SELECT
    *,
    questions.id AS question_id,
    answers.id AS answer_id,
    questions.text as question,
    answers.text as answer
    FROM quizzes
    JOIN questions ON quizzes.id = questions.quiz_id
    JOIN answers ON questions.id = answers.question_id
    WHERE quizzes.id = $1
  `;
  return dbQuery(queryString, queryParams).then((data) => {
    return data;
  });
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const deleteAttempt = (queryParams) => {
  const answerQuery = `
    DELETE FROM attempts
    WHERE id = $1 AND user_id = $2
    ;`;
  return dbQuery(answerQuery, queryParams).then((data) => data);
};

module.exports = {
  getAllAttemptsForUser,
  startNewAttempt,
  getSpecificAttempt,
  deleteAttempt,
  getQuizWithGroupedAnswers,
};
