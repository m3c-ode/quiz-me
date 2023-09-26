const { dbQuery } = require('../connection');

const getUsers = () => {
  return dbQuery('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserQuizzes = (userParams) => {
  const queryString = `
    SELECT users.id as user_id, q.title, q.id as quiz_id
    FROM users
    JOIN quizzes q on owner_id = users.id
    WHERE users.id = $1
  ;`;
  return dbQuery(queryString, userParams)
    .then(data => data);
};

module.exports = { getUsers, getUserQuizzes };
