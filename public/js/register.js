'use strict';
console.log('register.js file was loaded');

import { authUrl, getDataFetch, rolsUrl } from './modules/helper.js';

const els = {
  registerForm: document.getElementById('register-form'),
  username: document.getElementById('username'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  repeatPassword: document.getElementById('repeat-password'),
  role: document.getElementById('role'),
};

// gauti is url visas roles ir sudeti jas i selekto option
async function getRols() {
  const [data, error] = await getDataFetch(rolsUrl);
  if (error) {
    console.log('error ===', error);
    return;
  }
  // suku cikla kad sugeneruoti i option kategorijas
  data.forEach((dObj) => {
    const optionEl = document.createElement('option');
    optionEl.value = dObj.role_id;
    optionEl.textContent = dObj.role_name;
    els.role.append(optionEl);
  });
}
getRols();

// sukuriu event listineri kuris surinks imputu value ir sukurs viena objekta kuri issius su kita funkcija
els.registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // surenku inpututs i objekta
  const newUser = {
    user_name: els.username.value.trim(),
    email: els.email.value.trim(),
    password: els.password.value.trim(),
    role_id: els.role.value.trim(),
  };
  // isiunciu post su
  createNewUser(newUser);
});

function createNewUser(userObj) {
  fetch(`${authUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.msg !== 'Login success') {
        console.log('Error message from server:', data.msg);
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
    if (obj.field === 'user_name') {
      els.username.classList.add('is-invalid');
      els.username.after(divEl);
    }
    if (obj.field === 'email') {
      els.email.classList.add('is-invalid');
      els.email.after(divEl);
    }
    if (obj.field === 'password') {
      els.password.classList.add('is-invalid');
      els.password.after(divEl);
    }
    if (obj.field === 'role_id') {
      els.role.classList.add('is-invalid');
      els.role.after(divEl);
    }
  });
}

function clearErrorMessages() {
  // istriname klaidas
  const existingErrorMessages = document.querySelectorAll('.invalid-feedback');
  existingErrorMessages.forEach((element) => element.remove());
  // istrinu klase kad neberodytu
  els.email.classList.remove('is-invalid');
  els.username.classList.remove('is-invalid');
  els.password.classList.remove('is-invalid');
  els.role.classList.remove('is-invalid');
}
