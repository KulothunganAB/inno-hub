const mysql = require('mysql2/promise');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const pool = mysql.createPool(process.env.DATABASE_URL);

module.exports = pool;
