//Filepath: client/src/models/GoogleAPIBook.ts
// This file defines interfaces for the structure of book objects returned by the Google Books API.

// Interface representing the volume information of a book from the Google Books API.
export interface GoogleAPIVolumeInfo {
    title: string;
    authors: string[];
    description: string;
    imageLinks: {
        smallThumbnail: string; // A URL to a small thumbnail image of the book's cover.
        thumbnail: string; // A URL to a larger thumbnail image of the book's cover.
    };
}

// Interface representing a book object returned by the Google Books API.
export interface GoogleAPIBook {
    id: string; // A unique identifier for the book (from the Google Books API).
    volumeInfo: GoogleAPIVolumeInfo; // Detailed information about the book.
}
