import { jwtDecode, type JwtPayload } from 'jwt-decode';
interface ExtendedJwt extends JwtPayload {
    data: {
        username: string;
        email: string;
        _id: string;
    };
}

class AuthService {
    // get user data
    getProfile() {
        return jwtDecode<ExtendedJwt>(this.getToken() || '');
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
            const decoded = jwtDecode<JwtPayload>(token);

            if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
                return true;
            }

            return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token') || '';
    }

    login(idToken: string) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');

        window.location.assign('/');
    }
}

export default new AuthService();
