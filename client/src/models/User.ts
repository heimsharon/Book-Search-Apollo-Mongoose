// Filepath: client/src/models/User.ts
// This file defines the User interface, which represents the structure of a user object in the application.

import type { Book } from './Book';

// Interface representing a user in the application.
export interface User {
    username: string | null;
    email: string | null;
    password: string | null;
    savedBooks: Book[];
}