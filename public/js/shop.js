'use strict';
console.log('shop.js file was loaded');

import { getDataFetch, shopItemsUrl } from './modules/helper.js';

const els = {
  ulCont: document.getElementById('shop-item-list'),
};
console.log('els ===', els);
// ir parsiusti visus shop itemus
const [shopItemArr, error] = await getDataFetch(shopItemsUrl);

console.log('error ===', error);
console.log('shopItemArr ===', shopItemArr);

if (Array.isArray(shopItemArr)) {
  creatShopItemList(shopItemArr);
}

function creatShopItemList(arr) {
  // pagaminti html elementus
  arr.map(makeOneCard).forEach((htmlEl) => {
    // sudeti i sarasa
    els.ulCont.append(htmlEl);
  });
}

function makeOneCard(sObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';
  liEl.dataset.shopItId = sObj.shop_item_id;
  liEl.innerHTML = `
    <img src="${sObj.image}" alt="${sObj.shop_item_name}">
    <div class="card-body">
      <h5 class="card-title">${sObj.shop_item_name}</h5>
      <p class="card-text">${sObj.description} </p>
      <h5 class="card-title">${sObj.price}</h5>
    </div>
    <div class="flex center">
      <a href="#" class="btn">Add to cart</a>
      <button class="btn btn-secondary">Delete</button>
  </div>

  `;
  // Nr 2 de possiblite
  // const btnEl = liEl.querySelector('button');
  // btnEl.addEventListener('click', (event) => {
  //   const btnPressed = event.target;
  //   deletePet(pObj.pet_id, btnPressed);
  // });

  // const btnEl = liEl.querySelector('button');
  // btnEl.addEventListener('click', deletePet);

  return liEl;
}
