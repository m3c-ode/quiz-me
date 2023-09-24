const { dbQuery } = require('../connection');

const createQuizz = (queryParams) => {
  const queryString = `
  INSERT INTO quizzes (owner_id, is_public, title)
  VALUES ($1, $2, $3)
  RETURNING id
  ;`;
  return dbQuery(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

module.exports = { createQuizz };