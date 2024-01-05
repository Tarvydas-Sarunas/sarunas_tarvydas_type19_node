require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
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

// import Router
const usersRouter = require('./routes/usersRouter');
const shopRouter = require('./routes/shopRouter');

// use Router
app.use('/api/auth', usersRouter);
app.use('/api/shop_items', shopRouter);

// connect
// testConnection();

// app.listen(PORT);
app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
