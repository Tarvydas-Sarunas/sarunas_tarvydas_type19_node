'use strict';
console.log('login.js file was loaded');

import { authUrl } from './modules/helper.js';

const els = {
  form: document.getElementById('login-form'),
  email: document.getElementById('username'),
  password: document.getElementById('password'),
};
console.log('els ===', els);

// 1. sukuriu formai eventlistineri kur jis paims inputu value
els.form.addEventListener('submit', (e) => {
  e.preventDefault();

  // surenku inpututs i objekta
  const userConnection = {
    email: els.email.value.trim(),
    password: els.password.value.trim(),
  };
  // isiunciu post su
  authLogin(userConnection);
});

function authLogin(userObj) {
  console.log('Before fetch call');

  fetch(`${authUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  })
    .then((resp) => {
      // kai sekme tai naviguojam i home page
      if (resp.status === 200) {
        // issaugau i session storage musu prisijungima
        // sessionStorage.setItem('loggedIn', userObj.email);
        // ir kai visaks ok mane nuveda i shop.html
        window.location.href = 'shop.html';
        return resp.json();
      } else if (resp.status === 400) {
        isInvalid();
      }
      return resp.json();
    })
    .then((data) => {
      if (data.type === 'validation') {
        alert(data.msg);
        return;
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}

function isInvalid() {
  // Supprimer les messages d'erreur existants
  clearErrorMessages();

  const divEl = document.createElement('div');
  divEl.classList.add('invalid-feedback');
  divEl.textContent = 'Your login or password is wrong';
  els.email.classList.add('is-invalid');
  els.password.classList.add('is-invalid');
  els.password.after(divEl);
}

function clearErrorMessages() {
  // Supprimer les messages d'erreur existants
  const existingErrorMessages = document.querySelectorAll('.invalid-feedback');
  existingErrorMessages.forEach((element) => element.remove());
  // Supprimer la classe 'is-invalid' des champs de saisie
  els.email.classList.remove('is-invalid');
  els.password.classList.remove('is-invalid');
}
