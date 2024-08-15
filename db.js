require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.HOST,
  port: process.env.POSTGRESQL_PORT || 5432, // Default port is 5432 if not specified
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = pool;
