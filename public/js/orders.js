'use strict';
console.log('orders.js file was loaded');

import { getDataFetch, ordersUrl } from './modules/helper.js';
import { createNavBar, loginOrNo } from './modules/navBar.js';

const els = {
  tableBody: document.getElementById('order-table'),
  userSelect: document.getElementById('users'),
};
console.log('els ===', els);
// ir parsiusti visus shop itemus
const [ordersArr, error] = await getDataFetch(ordersUrl);

console.log('error ===', error);
console.log('ordersArr ===', ordersArr);

// tikriname ar gauta info is url yra arr
// jei taip sakome ka daryti
if (Array.isArray(ordersArr)) {
  createOrderTable(ordersArr);
  filterForSelect();
  getUsers(ordersArr);
}
// iskvieciu selekt su fitru
els.userSelect.addEventListener('input', filterForSelect);
// pridedu addEventListener selectui kad isirikus useri filtruotu tik jo orderius pagal user_id
function filterForSelect() {
  console.log('filterForSelect called');
  // pasiimu id is selekto
  const userId = els.userSelect.value;
  console.log('userId ===', userId);
  // Filtrer les commandes pour l'utilisateur sélectionné
  const userOrders = ordersArr.filter(
    (tObj) => tObj.user_id === parseInt(userId, 10)
  );
  console.log('userOrders ===', userOrders);
  // Mettez à jour le tableau avec les nouvelles commandes
  createOrderTable(userOrders);
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

// sudeti userius i selekto option
async function getUsers(tableArr) {
  // suku cikla kad sugeneruoti i option kategorijas
  tableArr.forEach((tObj) => {
    const optionEl = document.createElement('option');
    optionEl.value = tObj.user_id;
    optionEl.textContent = tObj.user_name;
    els.userSelect.append(optionEl);
  });
}

createNavBar();
loginOrNo();
