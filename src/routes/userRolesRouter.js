const express = require('express');
const { dbQueryWithData } = require('../helper');

const userRolesRouter = express.Router();

const dbTable = 'user_roles';
// routes
// GET api/user_roles - gauti visas roles
userRolesRouter.get('/', async (req, res) => {
  const sql = `SELECT * FROM ${dbTable}`;
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

// export
module.exports = userRolesRouter;
