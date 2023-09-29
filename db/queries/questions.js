const { dbQuery } = require('../connection');


/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const createQuestion = (queryParams) => {
  const questionQuery = `
    INSERT INTO questions (quiz_id, text)
    VALUES ($1, $2)
    RETURNING *
    ;`;
  return dbQuery(questionQuery, queryParams)
    .then(data => {
      return data;
    });
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const getQuizQuestions = (queryParams) => {
  const questionQuery = `
    SELECT text
    FROM questions
    JOIN quizzes on quizzes.id = quiz_id
    WHERE quiz_id=$1
    ORDER BY questions.id
    ;`;
  return dbQuery(questionQuery, queryParams)
    .then(data => {
      return data;
    });
};

module.exports = { createQuestion, getQuizQuestions };