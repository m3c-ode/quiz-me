// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

// m3: Not necessary with pools?
db.connect();

const dbQuery = (queryString, queryParams, callback) => {
  console.log('executed query: ', queryString);
  queryParams && console.log('with params : ', queryParams);
  return db.query(queryString, queryParams, callback)
    .then(res => {
      return res.rows;
    })
    .catch(error => {
      console.log('error querying', error.message);
      throw new Error('error querying', error.message);
    });
};

module.exports = { db, dbQuery };
