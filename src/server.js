require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const testConnection = require('./routes/testRoutes');

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
// testConnection();

// app.listen(PORT);
app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
