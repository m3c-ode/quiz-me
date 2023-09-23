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

// Not necessary with pools?
db.connect();

const query = (queryString, queryParams, callback) => {
  console.log('executed query: ', queryString);
  return pool.query(queryString, queryParams, callback)
    .then(res => res.rows)
    .catch(error => console.log('error querying', error.message));
};

module.exports = { db, query };
