const { dbQuery } = require('../connection');

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const createQuiz = (queryParams) => {
  const queryString = `
  INSERT INTO quizzes (owner_id, is_public, title)
  VALUES ($1, $2, $3)
  RETURNING *
  ;`;
  return dbQuery(queryString, queryParams)
    .then(data => {
      return data;
    });
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const deleteQuiz = (queryParams) => {
  const queryString = `
  DELETE FROM quizzes
  WHERE id=$1
  RETURNING id
  ;
  `;
  return dbQuery(queryString, queryParams)
    .then(data => {
      return data;
    });
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const getQuiz = (queryParams) => {
  const queryString = `
    SELECT
    quizzes.id AS quiz_id,
    quizzes.title AS quiz_title,
    questions.text AS question,
    answers.text AS answer,
    answers.is_correct
    FROM quizzes
    JOIN questions ON quizzes.id = questions.quiz_id
    JOIN answers ON questions.id = answers.question_id
    WHERE quizzes.id=$1
    GROUP BY quizzes.id, questions.id, answers.id
  `;
  return dbQuery(queryString, queryParams)
    .then(data => {
      return data;
    });
};
/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const getAllPublicQuizzes = (queryParams) => {
  const queryString = `
      SELECT
      quizzes.id AS quiz_id,
      quizzes.title AS quiz_title,
      questions.text AS question
      FROM quizzes
      JOIN questions ON quizzes.id = questions.quiz_id
      WHERE is_public=true
      GROUP BY quizzes.id, questions.id
      ORDER BY quiz_id, questions.id
  ;`;
  return dbQuery(queryString, queryParams)
    .then(data => {
      return data;
    });
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const editQuiz = (queryParams) => {
  const queryString = `
    UPDATE quizzes
    SET owner_id = $1, is_public=$2, title=$3
    WHERE id=$4
    RETURNING *
    ;
  `;
  return dbQuery(queryString, queryParams)
    .then(data => {
      return data;
    });
};



module.exports = { createQuiz, deleteQuiz, getQuiz, editQuiz, getAllPublicQuizzes };