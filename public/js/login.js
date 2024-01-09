'use strict';

console.log('login.js file was loaded');

import { authUrl, getDataFetch } from './modules/helper.js';
import { createNavBar, loginOrNo } from './modules/navBar.js';

const els = {
  form: document.getElementById('login-form'),
  email: document.getElementById('username'),
  password: document.getElementById('password'),
};

// 1. sukuriu formai eventlistineri kur jis paims inputu value
els.form.addEventListener('submit', (e) => {
  e.preventDefault();

  // surenku inpututs i objekta
  const userConnection = {
    email: els.email.value.trim(),
    password: els.password.value.trim(),
  };

  // isiunciu post su sia funkcija
  authLogin(userConnection);
});

function authLogin(userObj) {
  fetch(`${authUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('Duomenys ===', data);
      if (data.msg !== 'Login success') {
        console.log('Error message from server:', data.msg);
        isInvalid(data);
        return Promise.reject('Login failed'); // Rejeter la promesse en cas d'échec de connexion
      }
      // Jei viskas gerai
      return connectToLocal();
    })
    .then(() => {
      // iskvieciu patikrinima ar prisijunges
      loginOrNo();
      // nukreipiame į shop.html
      window.location.href = 'shop.html';
    })
    .catch((error) => {
      if (error !== 'Login failed') {
        console.error('ivyko klaida:', error);
        // Tvarkyti kitas klaidas, jei reikia
      }
    });
}

async function connectToLocal() {
  const [roleData, roleError] = await getDataFetch(
    `${authUrl}/${els.email.value.trim()}`
  );
  localStorage.setItem('email', els.email.value.trim());
  localStorage.setItem('userRole', roleData[0].role_id);
  localStorage.setItem('areLogin', true);
}

function isInvalid(errArr) {
  // istriname klaidas
  clearErrorMessages();

  errArr.forEach((obj) => {
    const divEl = document.createElement('div');
    divEl.classList.add('invalid-feedback');
    divEl.textContent = obj.error;
    els.email.classList.add('is-invalid');
    els.password.classList.add('is-invalid');
    els.password.after(divEl);
  });
}

function clearErrorMessages() {
  // istriname klaidas
  const existingErrorMessages = document.querySelectorAll('.invalid-feedback');
  existingErrorMessages.forEach((element) => element.remove());
  // istriname klaidas
  els.email.classList.remove('is-invalid');
  els.password.classList.remove('is-invalid');
}

createNavBar();
loginOrNo();
