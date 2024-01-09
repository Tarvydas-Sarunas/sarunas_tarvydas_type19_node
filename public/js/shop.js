'use strict';
console.log('shop.js file was loaded');

import {
  authUrl,
  getDataFetch,
  ordersUrl,
  shopItemsUrl,
} from './modules/helper.js';
import { createNavBar, loginOrNo } from './modules/navBar.js';

const els = {
  ulCont: document.getElementById('shop-item-list'),
};

// ir parsiusti visus shop itemus
const [shopItemArr, error] = await getDataFetch(shopItemsUrl);
const [authArr, authError] = await getDataFetch(
  `${authUrl}/${localStorage.getItem('email')}`
);

if (Array.isArray(shopItemArr)) {
  creatShopItemList(shopItemArr);
}

let userId;

function findUserId(uArr) {
  const userObj = uArr.find(
    (uObj) => uObj.email === localStorage.getItem('email')
  );
  if (userObj) {
    userId = userObj.user_id;
  } else {
    userId = null;
  }
  console.log('userId ===', userId);
  return userId;
}

if (Array.isArray(authArr)) {
  findUserId(authArr);
}

function creatShopItemList(arr) {
  els.ulCont.innerHTML = '';
  // pagaminti html elementus
  arr.map(makeOneCard).forEach((htmlEl) => {
    // sudeti i sarasa
    els.ulCont.append(htmlEl);
  });
}

// gaminu visa kortele
function makeOneCard(sObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';

  liEl.dataset.shopItId = sObj.shop_item_id;

  liEl.innerHTML = `
    <img src="${sObj.image}" alt="${sObj.shop_item_name}">
    <div class="card-body">
      <h5 class="card-title">${sObj.shop_item_name}</h5>
      <p class="card-text">${sObj.description} </p>
      <h5 class="card-title">${sObj.price} €</h5>
    </div>
    <div class="flex center">
    <input type="number" id="quantity" class="shop"
            placeholder="Quantity">
    <button class="btn btn-primary add-to-cart">Cart</button>
    <button class="btn btn-secondary delete">Delete</button>
    </div>
  `;

  // paimu butonus ir duosu jiems eventListineri kurie vykdys sias funkcihas
  const addToCartBtn = liEl.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', addToCart);

  const btnEl = liEl.querySelector('.delete');
  btnEl.addEventListener('click', deleteShopItem);
  return liEl;
}

function deleteShopItem(e) {
  const deleteBtn = e.target;

  const cardEl = deleteBtn.closest('.card');
  console.log('cardEl ===', cardEl);

  const idToDelete = cardEl.dataset.shopItId;
  console.log('idToDelete ===', idToDelete);

  fetch(`${shopItemsUrl}/${idToDelete}`, {
    method: 'DELETE',
  })
    .then((resp) => {
      console.log('resp ===', resp);
      if (resp.status === 200) {
        console.log('istrinta sekmingai');
        // jei taip tai istrinti pati elementa (el.remove())
        cardEl.remove();
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}

// ====================================================================

function addToCart(e) {
  const addToCartBtn = e.target;
  const cardEl = addToCartBtn.closest('.card');
  const idShopItem = cardEl.dataset.shopItId;

  // susirenku value is input quantity
  const quantityInput = cardEl.querySelector('.shop');
  const itemQuantity = parseInt(quantityInput.value, 10);

  console.log('idShopItem ===', idShopItem);
  // pasiemu info is shopItemArr kuri parsisiunciau su getDataFetch
  const shopItem = shopItemArr.find(
    (sObj) => sObj.shop_item_id === parseInt(idShopItem, 10)
  );

  // patikrinam ar gavom gera objekta
  if (!shopItem) {
    console.error('Shop item not found.');
    return;
  }
  const price = shopItem.price;
  // naujas objektas kuri siusiu
  const newOrder = {
    user_id: userId,
    shop_item_id: shopItem.shop_item_id,
    quantity: itemQuantity,
    total_price: price * itemQuantity,
    status: 'Order placed',
  };

  // issiuntimas
  orderToServer(newOrder);
}

// funkcija issiuntimui i serveri
function orderToServer(order) {
  fetch(`${ordersUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.msg !== 'Success') {
        console.log('Error message from server:', data);
        isInvalid(data);
      } else {
        console.log('Success message from server:', data);
        isValid(data);
      }
    })
    .catch((error) => {
      console.error('ivyko klaida:', error);
      // Tvarkyti kitas klaidas, jei reikia
    });
}

// valide
function isValid(data) {
  // istrinti senesnias klaidas
  clearErrorMessages();

  // suku cikla ir kvieciu po ju imputais
  if (data.msg === 'Success') {
    const quantityInput = document.getElementById('quantity');
    quantityInput.classList.add('is-valid');
  }
}

function isInvalid(errArr) {
  // istrinti senesnias klaidas
  clearErrorMessages();

  // suku cikla ir kvieciu po ju imputais
  errArr.forEach((obj) => {
    const divEl = document.createElement('div');
    divEl.classList.add('invalid-feedback');
    divEl.textContent = obj.error;
    if (obj.field === 'quantity') {
      const quantityInput = document.querySelector('.shop');
      quantityInput.classList.add('is-invalid');
      quantityInput.after(divEl);
    }
  });
}

function clearErrorMessages() {
  // istriname klaidas
  const existingErrorMessages = document.querySelectorAll('.invalid-feedback');

  existingErrorMessages.forEach((element) => element.remove());
  // istrinu klase kad neberodytu
  const quantityInput = document.querySelector('.shop');
  quantityInput.classList.remove('is-invalid');

  const existinMessages = document.getElementById('quantity');
  existinMessages.classList.remove('is-valid');
}

function hideBtn() {
  const userRole = localStorage.getItem('userRole');
  const userLogin = localStorage.getItem('areLogin') === 'true';

  const els = {
    btnDelete: document.querySelector('.delete'),
    btnAddCart: document.querySelector('.add-to-cart'),
  };

  if (userLogin && userRole === '1') {
    els.btnDelete.style.display = 'inline-block';
    els.btnAddCart.style.display = 'none';
  } else {
    els.btnAddCart.style.display = 'inline-block';
    els.btnDelete.style.display = 'none';
  }
}

hideBtn();

createNavBar();
loginOrNo();
