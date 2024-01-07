'use strict';
console.log('add_item.js file was loaded');

import { getDataFetch, itemTypesUrl, shopItemsUrl } from './modules/helper.js';

const els = {
  form: document.getElementById('register-form'),
  articleName: document.getElementById('article-name'),
  prise: document.getElementById('prise'),
  description: document.getElementById('description'),
  image: document.getElementById('image'),
  type: document.getElementById('type'),
};

// gauti is url item_type visus typus ir sudeti juos i selekta option
async function getTypes() {
  const [data, error] = await getDataFetch(itemTypesUrl);
  if (error) {
    console.log('error ===', error);
    return;
  }
  console.log('data ===', data);
  // suku cikla kad sugeneruoti i option kategorijas
  data.forEach((dObj) => {
    const optionEl = document.createElement('option');
    optionEl.value = dObj.item_type_id;
    optionEl.textContent = dObj.item_type_name;
    els.type.append(optionEl);
  });
}
getTypes();

// sukuriu event listineri kuris surinks imputu value ir sukurs viena objekta kuri issius su kita funkcija
els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  // surenku inpututs i objekta
  const newShopItem = {
    shop_item_name: els.articleName.value.trim(),
    price: els.prise.value.trim(),
    description: els.description.value.trim(),
    image: els.image.value.trim(),
    item_type_id: els.type.value.trim(),
  };

  console.log('newUser ===', newShopItem);
  // isiunciu post su
  createNewShopItem(newShopItem);
});

function createNewShopItem(shopItemObj) {
  fetch(`${shopItemsUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shopItemObj),
  })
    .then((resp) => {
      if (resp.status === 201) {
        window.location = 'shop.html';
      } else {
        return resp.json();
      }
    })
    .then((data) => {
      console.log('data ===', data);
      // isInvalid([data.msg]);
    })
    .catch((err) => {
      console.log('err ===', err);
    });
}
