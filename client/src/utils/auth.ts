// use this to decode a token and get the user's information out of it
import { jwtDecode } from 'jwt-decode';

interface UserToken {
    name: string;
    exp: number;
}

// create a new class to instantiate for a user
class AuthService {
    // get user data
    getProfile() {
        return jwtDecode(this.getToken() || '');
    }

    // check if user's logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // hand waiving here
    }

    // check if token is expired
    isTokenExpired(token: string) {
        try {
            const decoded = jwtDecode<UserToken>(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }

            return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    login(idToken: string) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.replace('/');
    }
}

export default new AuthService();
