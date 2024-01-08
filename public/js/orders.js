'use strict';
console.log('orders.js file was loaded');

import { getDataFetch, ordersUrl } from './modules/helper.js';

const els = {
  tableBody: document.getElementById('order-table'),
};

// ir parsiusti visus shop itemus
const [ordersArr, error] = await getDataFetch(ordersUrl);

console.log('error ===', error);
console.log('ordersArr ===', ordersArr);

if (Array.isArray(ordersArr)) {
  createOrderTable(ordersArr);
}

function createOrderTable(arr) {
  els.tableBody.innerHTML = '';
  // pagaminti html elementus
  arr.map(makeTrTh).forEach((htmlEl) => {
    // sudeti i sarasa
    els.tableBody.append(htmlEl);
  });
}

function makeTrTh(tObj) {
  const trEl = document.createElement('tr');
  // liEl.dataset.shopItId = sObj.shop_item_id;
  trEl.innerHTML = `
  <td>${tObj.order_id}</td>
  <td>${tObj.user_id}</td>
  <td>${tObj.user_name}</td>
  <td>${tObj.shop_item_id}</td>
  <td>${tObj.shop_item_name}</td>
  <td>${tObj.price}</td>
  <td>${tObj.quantity}</td>
  <td>${tObj.total_price}</td>
  <td>${tObj.status}</td>
  `;
  return trEl;
}
