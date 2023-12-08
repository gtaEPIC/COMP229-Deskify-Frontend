import { jwtDecode } from 'jwt-decode';

function authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
        sessionStorage.setItem('jwt', jwt);

        let decoded = jwtDecode(jwt);
        sessionStorage.setItem('username', decoded.username);
    }
    cb();
}

function checkToken(token) {
    let decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('username');
        return false;
    }
    return true;
}

function isAuthenticated() {
    if (typeof window == "undefined") {
        return false
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
    }
}

function getUsername() {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem('username');
    }
}

export { authenticate, isAuthenticated, logout, getUsername }