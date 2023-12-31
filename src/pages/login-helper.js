// login-helper.js
const {jwtDecode} = require('jwt-decode');
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

function authenticate(jwt, cb) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem('jwt', jwt);

    let decoded = jwtDecode(jwt);
    sessionStorage.setItem('username', decoded.username);
    sessionStorage.setItem('isAdmin', (decoded.isAdmin).toString())
  }
  cb();
}

function checkToken(token) {
  let decoded = jwtDecode(token);
  if (decoded.exp < Date.now() / 1000) {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isAdmin');
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
    sessionStorage.removeItem('isAdmin');
  }
}

function getUsername() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem('username');
  }
}

function getIsAdmin() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('isAdmin') === 'true';
  }
}

module.exports = { authenticate, isAuthenticated, logout, getUsername, getIsAdmin };
