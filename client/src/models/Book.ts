// Filepath: client/src/models/Book.ts
// This file defines the Book interface, which represents the structure of a book object.

export interface Book {
    authors: string[];
    description: string;
    bookId: string; // A unique identifier for the book (from the Google Books API).
    image: string; // A URL to the book's cover image.
    link: string; // A URL to the book's page on the Google Books website.
    title: string;
}
