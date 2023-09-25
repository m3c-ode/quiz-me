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
  // .catch(error => {
  //   console.error('Error creating question in createQuestion:', error.message);
  //   return Promise.reject(error); // Return a rejected promise to propagate the error    });
  // });
};

module.exports = { createQuestion };