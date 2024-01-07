'use strict';
console.log('shop.js file was loaded');

import { getDataFetch, shopItemsUrl } from './modules/helper.js';

const els = {
  ulCont: document.getElementById('shop-item-list'),
};

// ir parsiusti visus shop itemus
const [shopItemArr, error] = await getDataFetch(shopItemsUrl);

console.log('shopItemArr ===', shopItemArr);

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

function makeOneCard(sObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';
  console.log('sObj.shop_item_id ===', sObj.shop_item_id);
  liEl.dataset.shopItId = sObj.shop_item_id;
  console.log('liEl.dataset.shopItId ===', liEl.dataset.shopItId);

  liEl.innerHTML = `
    <img src="${sObj.image}" alt="${sObj.shop_item_name}">
    <div class="card-body">
      <h5 class="card-title">${sObj.shop_item_name}</h5>
      <p class="card-text">${sObj.description} </p>
      <h5 class="card-title">${sObj.price} €</h5>
    </div>
    <div class="flex center">
    <button class="btn btn-primary add-to-cart">Add to cart</button>
      <button class="btn btn-secondary delete">Delete</button>
    </div>
  `;

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

function addToCart(e) {
  const addToCartBtn = e.target;
  const cardEl = addToCartBtn.closest('.card');
  const idToAddToCart = cardEl.dataset.shopItId;
}
