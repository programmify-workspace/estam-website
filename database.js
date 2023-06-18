import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
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

export default pool;