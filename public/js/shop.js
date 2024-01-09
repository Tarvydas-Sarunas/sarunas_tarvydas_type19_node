'use strict';
console.log('shop.js file was loaded');

import { getDataFetch, ordersUrl, shopItemsUrl } from './modules/helper.js';

const els = {
  ulCont: document.getElementById('shop-item-list'),
};

// ir parsiusti visus shop itemus
const [shopItemArr, error] = await getDataFetch(shopItemsUrl);

if (Array.isArray(shopItemArr)) {
  creatShopItemList(shopItemArr);
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

  // pasiemu info is shopItemArr kuri parsisiunciau su getDataFetch
  const shopItem = shopItemArr.find((sObj) => sObj.shop_item_id === idShopItem);

  // naujas objektas kuri siusiu
  const newOrder = {
    user_id: localStorage.getItem('user_id'),
    shop_item_id: shopItem.shop_item_id,
    price: shopItem.price,
    quantity: itemQuantity,
    total_price: shopItem.price * itemQuantity,
    status: 'Order placed',
  };

  // issiuntimas
  orderToServer(newOrder);
}

// funkcija issiuntimui i serveri
function orderToServer(order) {
  fetch(`${ordersUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.msg !== 'Login success') {
        console.log('Error message from server:', data.msg);
        isInvalid(data);
        return;
      }
      // Dabar, kai connectToLocal yra baigtas, nukreipiame į shop.html
      // window.location.href = 'shop.html';
    })
    .catch((error) => {
      console.error('ivyko klaida:', error);
      // Tvarkyti kitas klaidas, jei reikia
    });
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
}
