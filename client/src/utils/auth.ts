//Filepath: client/src/utils/auth.ts
// This file contains the AuthService class, which provides utility methods for handling user authentication, including token management, login, logout, and checking authentication status.
import { jwtDecode, type JwtPayload } from 'jwt-decode';

// Extended JWT payload interface to include user-specific data.
interface ExtendedJwt extends JwtPayload {
    data: {
        username: string;
        email: string;
        _id: string;
    };
}

class AuthService {
    // Retrieves the user's profile data from the token.
    getProfile() {
        return jwtDecode<ExtendedJwt>(this.getToken() || '');
    }

    // Checks if the user is logged in by verifying the presence and validity of the token.
    loggedIn() {
        // Checks if there is a saved token and if it's still valid.
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // Checks if the provided token is expired.
    isTokenExpired(token: string) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);

            // If the token has an expiration time and it's in the past, return true (expired).
            if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
                return true;
            }

            return false; // Token is still valid.
        } catch (err) {
            // If an error occurs during decoding, assume the token is invalid.
            return false;
        }
    }

    // Retrieves the user token from localStorage.
    getToken() {
        return localStorage.getItem('id_token') || '';
    }

    // Saves the user token to localStorage and redirects to the home page.
    login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/'); // Redirects to the home page after login.
    }

    // Removes the user token from localStorage and redirects to the home page.
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/'); // Redirects to the home page after logout.
    }
}

export default new AuthService();
