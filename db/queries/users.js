const { dbQuery } = require('../connection');

const getUsers = () => {
  return dbQuery('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
