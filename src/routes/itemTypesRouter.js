const express = require('express');
const { dbQueryWithData } = require('../helper');

const itemTypesRouter = express.Router();

const dbTable = 'item_types';
// routes
// GET /api/shop_items - gauti visas parduotuves prekes
itemTypesRouter.get('/', async (req, res) => {
  const sql = `SELECT * FROM ${dbTable}`;
  const [shopItemArr, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(shopItemArr);
});

// export
module.exports = itemTypesRouter;
