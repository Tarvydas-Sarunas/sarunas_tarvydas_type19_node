'use strict';
console.log('navBar.js file was loaded');

const navContainer = document.getElementById('nav-container');

// sukuriu navigacija
function createNavBar() {
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  logoDiv.innerHTML = `<a href="#" class="logo">New Store</a>`;

  const navbar = document.createElement('div');
  navbar.classList.add('nav');
  navbar.innerHTML = `
    <ul class="main-nav">
      <li class="nav-item">
        <a id="shopLink" class="nav-link" href="shop.html">SHOP</a>
      </li>
      <li class="nav-item">
        <a id="ordersLink" class="nav-link" href="orders.html">Orders</a>
      </li>
      <li class="nav-item">
        <a id="registerLink" class="nav-link" href="register.html">Register</a>
      </li>
      <li class="nav-item">
        <a id="loginLink" class="nav-link login" href="login.html">Login</a>
      </li>
      <li class="nav-item">
        <a id="addItemLink" class="nav-link" href="add_item.html">Add article</a>
      </li>
      <li class="nav-item">
        <a id="logoutLink" class="nav-link logout" style="display: none;">Logout</a>
      </li>
    </ul>
  `;

  navContainer.append(logoDiv, navbar);

  loginOrNo();
}

// patikrinu ar prisilogines ar ne
function loginOrNo() {
  const userLogin = localStorage.getItem('areLogin') === 'true';
  const userRole = localStorage.getItem('userRole'); // Ajout de cette ligne

  const els = {
    registerLink: document.getElementById('registerLink'),
    loginLink: document.getElementById('loginLink'),
    logoutLink: document.getElementById('logoutLink'),
    addItemLink: document.getElementById('addItemLink'),
  };

  if (userLogin) {
    els.registerLink.style.display = 'none';
    els.loginLink.style.display = 'none';
    els.logoutLink.style.display = 'inline-block';
    // ar admin
    if (userRole === '1') {
      els.addItemLink.style.display = 'inline-block';
    } else {
      els.addItemLink.style.display = 'none';
    }
  } else {
    els.registerLink.style.display = 'inline-block';
    els.loginLink.style.display = 'inline-block';
    els.logoutLink.style.display = 'none';
    els.addItemLink.style.display = 'none';
  }

  // eventListiner
  els.logoutLink.addEventListener('click', logout);
}

// atsijungimas
function logout() {
  // istrinam is local storage
  localStorage.removeItem('email');
  localStorage.removeItem('userRole');
  localStorage.removeItem('areLogin');

  // siunciam atgal i html
  window.location.href = 'login.html';
}

// Export
export { createNavBar, loginOrNo, navContainer };
