// Filepath: server/src/types/interfaces.ts
// These TypeScript interfaces define the structure of various objects used in the application


// Interface for JWT payload
export interface JwtPayload {
    _id: string;
    username: string;
    email: string;
}

// Interface for user input
export interface UserInput {
    username: string;
    email: string;
    password: string;
}

// Interface for book input
export interface BookInput {
    bookId: string;
    title: string;
    authors: string[];
    description?: string;
    image?: string;
    link?: string;
}