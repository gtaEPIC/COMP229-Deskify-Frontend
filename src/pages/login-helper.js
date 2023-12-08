import { jwtDecode } from 'jwt-decode';

function authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
        sessionStorage.setItem('jwt', jwt);

        let decoded = jwtDecode(jwt);
        sessionStorage.setItem('username', decoded.username);
    }
    cb();
}

function isAuthenticated() {
    if (typeof window == "undefined") {
        return false
    }

    if (sessionStorage.getItem('jwt')) {
        return sessionStorage.getItem('jwt');
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