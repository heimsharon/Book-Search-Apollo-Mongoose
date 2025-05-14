// This file defines the schema and model for the User collection in the MongoDB database using Mongoose.
// It includes fields for user authentication, saved books, and custom methods for password validation.

import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import bookSchema from './Book.js';
import type { BookDocument } from './Book.js';

// Interface representing the structure of a User document.
export interface UserDocument extends Document {
    id: string;
    username: string;
    email: string;
    password: string; // The hashed password of the user.
    savedBooks: BookDocument[]; // An array of books saved by the user.
    isCorrectPassword(password: string): Promise<boolean>; // Method to validate the user's password.
    bookCount: number; // Virtual field for the number of saved books.
}

// Define the schema for the User collection.
const userSchema = new Schema<UserDocument>(
    {
        username: {
            type: String, // The username of the user.
            required: true, // This field is required.
            unique: true, // The username must be unique.
        },
        email: {
            type: String, // The email address of the user.
            required: true, // This field is required.
            unique: true, // The email must be unique.
            match: [/.+@.+\..+/, 'Must use a valid email address'], // Regex to validate email format.
        },
        password: {
            type: String, // The hashed password of the user.
            required: true, // This field is required.
        },
        // Set savedBooks to be an array of data that adheres to the bookSchema.
        savedBooks: [bookSchema],
    },
    // Enable virtuals to include computed fields in JSON responses.
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// Middleware to hash the user's password before saving it to the database.
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10; // Number of salt rounds for bcrypt.
        this.password = await bcrypt.hash(this.password, saltRounds); // Hash the password.
    }

    next(); // Proceed to the next middleware or save operation.
});

// Custom method to compare and validate the user's password for logging in.
userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password.
};

// Virtual field to calculate the number of saved books for a user.
userSchema.virtual('bookCount').get(function () {
    return this.savedBooks.length; // Return the length of the savedBooks array.
});

// Create the User model using the schema.
const User = model<UserDocument>('User', userSchema);

// Export the User model for use in other parts of the application.
export default User;
