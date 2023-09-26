const { dbQuery } = require("../connection");

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const createAttemptAnswer = (queryParams) => {
  const answerQuery = `
  INSERT INTO attempt_answers (attempt_id, question_id, answer_id)
  VALUES ($1, $2, $3)
  RETURNING *;
    ;`;
  return dbQuery(answerQuery, queryParams).then((data) => data);
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const getAttemptAnswer = (queryParams) => {
  const answerQuery = `
  SELECT
    *
  FROM
    attempt_answers
  LEFT JOIN attempts ON attempts.id = attempt_answers.attempt_id
  WHERE
    attempts.user_id = $1 AND
    attempt_answers.id = $2
    ;`;
  return dbQuery(answerQuery, queryParams).then((data) => data);
};

/**
 *
 * @param {any[]} queryParams
 * @returns {Promise}
 */
const deleteAttemptAnswer = (queryParams) => {
  const answerQuery = `
  DELETE FROM attempts
  WHERE id = $1 AND user_id = $2
    ;`;
  return dbQuery(answerQuery, queryParams).then((data) => data);
};

module.exports = { createAttemptAnswer, getAttemptAnswer, deleteAttemptAnswer };
