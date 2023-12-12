// login-helper.js
const jwtDecode = require('jwt-decode');

let decoded;

function authenticate(jwt, cb) {
  if (typeof window !== "undefined") {
    const existingJwt = sessionStorage.getItem('jwt');
    const existingUsers = JSON.parse(sessionStorage.getItem('users')) || [];

    if (!existingJwt && existingUsers.length === 0) {
      // First user registration, set as admin
      sessionStorage.setItem('getIsAdmin', 'true');
    } else {
      decoded = jwtDecode(jwt);
      sessionStorage.setItem('getIsAdmin', decoded.isAdmin);
    }

    sessionStorage.setItem('jwt', jwt);
    sessionStorage.setItem('username', decoded.username);
  }
  cb();
}

function checkToken(token) {
  let decoded = jwtDecode(token);
  if (decoded.exp < Date.now() / 1000) {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('getIsAdmin');
    return false;
  }
  return true;
}

function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }
  let token = sessionStorage.getItem('jwt');

  if (token) {
    return checkToken(token);
  } else {
    return false;
  }
}

function logout() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('getIsAdmin');
  }
}

function getUsername() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem('username');
  }
}

function getIsAdmin() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('getIsAdmin') === 'true';
  }
}

async function promoteToAdmin(username) {
  try {
    //  promote the user to admin
    console.log(`User ${username} promoted to admin`);
  } catch (error) {
    console.error('Error promoting user to admin', error);
  }
}

module.exports = { authenticate, isAuthenticated, logout, getUsername, getIsAdmin, promoteToAdmin };
