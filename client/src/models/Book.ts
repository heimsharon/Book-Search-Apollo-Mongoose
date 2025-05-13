// Filepath: client/src/models/Book.ts
// This file contains the Book interface, which defines the structure of a book object.

export interface Book {
  authors: string[],
  description: string;
  bookId: string;
  image: string;
  link: string;
  title: string;
}
