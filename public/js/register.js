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
console.log('els ===', els);

// gauti is url visas roles ir sudeti jas i selekto option
async function getRols() {
  const [data, error] = await getDataFetch(rolsUrl);
  if (error) {
    console.log('error ===', error);
    return;
  }
  console.log('data ===', data);
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
  console.log('newUser ===', newUser);
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
    .then((resp) => {
      if (resp.status === 201) {
        window.location = 'shop.html';
      } else {
        return resp.json();
      }
    })
    .then((errors) => {
      console.log('data ===', errors);
      if (errors && errors.length > 0) {
        isInvalid(errors);
      }
      // redirect to logs.html?petId=2
      // window.location = 'index.html';
    })
    .catch((err) => {
      console.log('err ===', err);
    });
}
