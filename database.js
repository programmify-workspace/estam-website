const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const hostname = process.env.DB_HOST;
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

// create the connection pool
const pool = mysql.createPool({
  host: hostname,
  user: username,
  password: password,
  database: database,
  connectionLimit: 10,
});

module.exports = pool;
