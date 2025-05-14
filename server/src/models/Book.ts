// Filepath: server/src/models/Book.ts
// This file defines the schema for a Book sub-document in the MongoDB database using Mongoose.
// The Book schema is used as a sub-document for the `savedBooks` array in the User model.

import { Schema, type Document } from 'mongoose';

// Interface representing the structure of a Book document.
export interface BookDocument extends Document {
    bookId: string; // The unique ID of the book (from Google Books API).
    title: string;
    authors: string[];
    description: string;
    image: string; // A URL to the book's cover image.
    link: string; // A URL to the book's page on the Google Books website.
}


// This schema will not become its own model but will be used as the schema for the `savedBooks` array in the User model.
const bookSchema = new Schema<BookDocument>({
    authors: [
        {
            type: String, // Each author is stored as a string.
        },
    ],
    description: {
        type: String,
        required: true,
    },
    // The unique ID of the book (from Google Books API).
    bookId: {
        type: String,
        required: true, // This field is required.
    },
    image: {
        type: String, // A URL to the book's cover image.
    },
    link: {
        type: String, // A URL to the book's page on the Google Books website.
    },
    title: {
        type: String,
        required: true,
    },
});

// Export the Book schema for use in the User model.
export default bookSchema;
