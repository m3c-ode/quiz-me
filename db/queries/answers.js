const { dbQuery } = require("../connection");


/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const createAnswer = (queryParams) => {
  const answerQuery = `
    INSERT INTO answers (question_id, text, is_correct)
    VALUES ($1, $2, $3)
    RETURNING *
    ;`;
  return dbQuery(answerQuery, queryParams)
    .then(data => data);
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const getQuestionAnswers = (queryParams) => {
  const questionQuery = `
    SELECT text, is_correct, id
    FROM answers
    JOIN questions on questions.id = question_id
    WHERE question_id=$1
    ORDER BY answers.id
    ;`;
  return dbQuery(questionQuery, queryParams)
    .then(data => {
      return data;
    });
};

module.exports = { createAnswer, getQuestionAnswers };
