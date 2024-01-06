const express = require('express');
const { dbQueryWithData } = require('../helper');

const ordersRouter = express.Router();

const dbTable = 'orders';
// routes

// POST /api/orders - sukurti uzsakyma su user_id, shop_item_id, quantity, total_price, status
ordersRouter.post('/', async (req, res) => {
  const {
    user_id: userId,
    shop_item_id: shopItemId,
    quantity,
    total_price: totalPrice,
    status,
  } = req.body;

  if (
    userId === undefined ||
    shopItemId === undefined ||
    quantity === undefined ||
    totalPrice === undefined ||
    status === undefined
  ) {
    res
      .status(400)
      .json({ error: 'Missing or undefined parameters in the request' });
    return;
  }
  const newOrder = [userId, shopItemId, quantity, totalPrice, status];
  const sql = `
    INSERT INTO ${dbTable} (user_id, shop_item_id, quantity, total_price, status)
    VALUES (?, ?, ?, ?, ?)`;
  const [newOrderRezObj, error] = await dbQueryWithData(sql, newOrder);
  if (error) {
    console.log('error ===', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (newOrderRezObj.affectedRows === 0) {
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  if (newOrderRezObj.affectedRows === 1) {
    res.status(201).json({ msg: 'New order was added' });
    return;
  }
  res.json(newOrderRezObj);
});

// export routers
module.exports = ordersRouter;
