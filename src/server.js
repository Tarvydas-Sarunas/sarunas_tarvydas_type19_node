require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World');
});

// connect
async function testConnection() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT * FROM posts LIMIT 1');
    console.log('Succesfuly connected to mysql ');
  } catch (error) {
    console.log('testConnection failed, did you start XAMPP mate???');
    console.log('error ===', error);
  } finally {
    if (conn) conn.end();
  }
}
testConnection();

// app.listen(PORT);
app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
