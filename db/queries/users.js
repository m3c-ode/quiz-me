const { dbQuery } = require('../connection');

const getUsers = () => {
  return dbQuery('SELECT id, username, avatar_url, email FROM users; ')
    .then(data => {
      return data;
    });
};

const getUserQuizzes = (userParams) => {
  const queryString = `
    SELECT users.id as user_id, q.title, q.id as quiz_id, q.is_public
    FROM users
    JOIN quizzes q on owner_id = users.id
    WHERE users.id = $1
  ;`;
  return dbQuery(queryString, userParams)
    .then(data => data);
};

const getUserInfo = (userParam) => {
  const queryString = `
    SELECT id, username, avatar_url, email FROM users
    WHERE id=$1
  ;`;
  return dbQuery(queryString, userParam)
    .then(data => {
      return data;
    });
};

module.exports = { getUsers, getUserQuizzes, getUserInfo };
