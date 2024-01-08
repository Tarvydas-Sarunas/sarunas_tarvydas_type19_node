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
    .then((resp) => resp.json())
    .then((data) => {
      if (data !== 'Success') {
        console.log('data ===', data);
        isInvalid(data);
        return;
      }
      // Dabar, kai connectToLocal yra baigtas, nukreipiame į shop.html
      window.location.href = 'shop.html';
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
    if (obj.field === 'shop_item_name') {
      els.articleName.classList.add('is-invalid');
      els.articleName.after(divEl);
    }
    if (obj.field === 'price') {
      els.prise.classList.add('is-invalid');
      els.prise.after(divEl);
    }
    if (obj.field === 'description') {
      els.description.classList.add('is-invalid');
      els.description.after(divEl);
    }
    if (obj.field === 'image') {
      els.image.classList.add('is-invalid');
      els.image.after(divEl);
    }
    if (obj.field === 'item_type_id') {
      els.type.classList.add('is-invalid');
      els.type.after(divEl);
    }
  });
}

function clearErrorMessages() {
  // istriname klaidas
  const existingErrorMessages = document.querySelectorAll('.invalid-feedback');
  existingErrorMessages.forEach((element) => element.remove());
  // istrinu klase kad neberodytu
  els.prise.classList.remove('is-invalid');
  els.articleName.classList.remove('is-invalid');
  els.description.classList.remove('is-invalid');
  els.type.classList.remove('is-invalid');
  els.image.classList.remove('is-invalid');
}
