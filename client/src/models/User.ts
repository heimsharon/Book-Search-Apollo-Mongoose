import type { Book } from './Book';

export interface User {
    username: string | null;
    email: string | null;
    password: string | null;
    savedBooks: Book[];
}

// Interface for signup form data
export interface SignupFormData {
    username: string;
    email: string;
    password: string;
}

// Interface for login form data
export interface LoginFormData {
    email: string;
    password: string;
}
