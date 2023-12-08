import { jwtDecode } from 'jwt-decode';

function authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
        localStorage.setItem('jwt', jwt);

        let decoded = jwtDecode(jwt);
        localStorage.setItem('username', decoded.username);
    }
    cb();
}

function isAuthenticated() {
    if (typeof window == "undefined") {
        return false
    }

    if (localStorage.getItem('jwt')) {
        return localStorage.getItem('jwt');
    } else {
        return false;
    }
}

function logout() {
    if (typeof window !== "undefined") {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
    }
}

function getUsername() {
    if (typeof window !== "undefined") {
        return localStorage.getItem('username');
    }
}

export { authenticate, isAuthenticated, logout, getUsername }