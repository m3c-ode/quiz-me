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

module.exports = { createAnswer };