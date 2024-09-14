require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432, // Default port is 5432 if not specified
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // local database configuration
  // host: "localhost",
  // port: process.env.DB_PORT || 5432, // Default port is 5432 if not specified
  // user: process.env.postgres,
  // password: process.env.POSTGRESDB_ROOT_PASSWORD,
  // database: process.env.POSTGRESDB_DATABASE,
});

module.exports = pool;
