const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkOrder } = require('../middleware');

const ordersRouter = express.Router();

const dbTable = 'orders';
// routes

// POST /api/orders - sukurti uzsakyma su user_id, shop_item_id, quantity, total_price, status
ordersRouter.post('/', checkOrder, async (req, res) => {
  const {
    user_id: userId,
    shop_item_id: shopItemId,
    quantity,
    total_price: totalPrice,
    status,
  } = req.body;

  const newOrder = [userId, shopItemId, quantity, totalPrice, status];
  const sql = `
    INSERT INTO ${dbTable} (user_id, shop_item_id, quantity, total_price, status)
    VALUES (?, ?, ?, ?, ?)`;
  const [newOrderRezObj, error] = await dbQueryWithData(sql, newOrder);
  if (error) {
    console.log('error ===', error);
    res.status(500).json('Server error');
    return;
  }
  if (newOrderRezObj.affectedRows === 0) {
    res.status(400).json(newOrderRezObj);
    return;
  }
  if (newOrderRezObj.affectedRows === 1) {
    res.status(201).json('Success');
    return;
  }
  res.status(400).json(newOrderRezObj);
});

// GET /api/orders - gauti visa pilna orders plius user_name, shop_item_name ir shop_item_price
ordersRouter.get('/', async (req, res) => {
  const sql = `SELECT orders.order_id, orders.user_id, users.user_name, orders.shop_item_id, shop_items.shop_item_name, orders.quantity, shop_items.price, orders.total_price, orders.status FROM orders JOIN users ON orders.user_id = users.user_id JOIN shop_items ON orders.shop_item_id = shop_items.shop_item_id`;
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

// GET /api/orders/:orderId - gauti viviena order pagal order id

ordersRouter.get('/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const sql = `SELECT orders.order_id, orders.user_id, users.user_name, orders.shop_item_id, shop_items.shop_item_name, orders.quantity, shop_items.price, orders.total_price, orders.status FROM orders JOIN users ON orders.user_id = users.user_id JOIN shop_items ON orders.shop_item_id = shop_items.shop_item_id`;
  const [rows, error] = await dbQueryWithData(sql, [orderId]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows[0]);
});

// GET /api/orders/:orderId - gauti visus pilnus orders pagal user id

ordersRouter.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const sql = `SELECT 
  orders.order_id,
  orders.user_id,
  users.user_name,
  orders.shop_item_id,
  shop_items.shop_item_name,
  orders.quantity,
  shop_items.price,
  orders.total_price,
  orders.status
FROM 
  orders
JOIN 
  users ON orders.user_id = users.user_id
JOIN 
  shop_items ON orders.shop_item_id = shop_items.shop_item_id
WHERE users.user_id=?`;
  const [rows, error] = await dbQueryWithData(sql, [userId]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

// export routers
module.exports = ordersRouter;
