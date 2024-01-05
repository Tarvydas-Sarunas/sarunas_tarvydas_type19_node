const express = require('express');
const { dbQueryWithData } = require('../helper');
const shopRouter = express.Router();

const dbTable = 'shop_items';
// routes
// POST /api/shop_items - sukurti parduotuves preke su name, price, description, image, item_type_id
shopRouter.post('/', async (req, res) => {
  const {
    shop_item_name: shopItemName,
    price,
    description,
    image,
    item_type_id: itemTypeId,
  } = req.body;
  const shopItem = [shopItemName, price, description, image, itemTypeId];
  const sql = `
    INSERT INTO ${dbTable} (shop_item_name, price, description, image, item_type_id)
    VALUES (?, ?, ?, ?, ?)`;
  const [rezObj, error] = await dbQueryWithData(sql, shopItem);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (rezObj.affectedRows === 0) {
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  if (rezObj.affectedRows === 1) {
    res.status(201).json({ msg: 'New shop item was added' });
    return;
  }
  res.json(rezObj);
});

module.exports = shopRouter;

// GET /api/shop_items - gauti visas parduotuves prekes
shopRouter.get('/', async (req, res) => {
  const sql = `SELECT * FROM ${dbTable} WHERE isArchived=0`;
  const [shopItemArr, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(shopItemArr);
});

// GET /api/shop_items - gauti visas parduotuves prekes
shopRouter.get('/:id', async (req, res) => {
  const id = +req.params.id;
  const sql = `SELECT * FROM ${dbTable} WHERE isArchived=0`;
  const [shopItemArr, error] = await dbQueryWithData(sql, [id]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(shopItemArr[0]);
});

// DELETE /api/shop_items/:id - istrinaviena parduotuves preke pagal id
shopRouter.delete('/:id', async (req, res) => {
  const id = +req.params.id;
  const sql = `UPDATE ${dbTable} SET isArchived=1 WHERE shop_item_id=? LIMIT 1`;
  const [apdRezObj, error] = await dbQueryWithData(sql, [id]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (apdRezObj.affectedRows === 0) {
    res.status(404).json({ msg: 'This id does not exist' });
    return;
  }
  if (apdRezObj.affectedRows === 1) {
    res.status(200).json({ msg: `Shop item with id ${id} was deleted` });
  }
});

// export
module.exports = shopRouter;
