// Filepath: server/src/schemas/resolvers.ts
// This file defines the resolvers for the GraphQL API.
// Resolvers handle the logic for queries and mutations, interacting with the database and returning the appropriate data.

import { signToken } from '../services/auth.js'; // Utility to generate authentication tokens.
import { AuthenticationError } from 'apollo-server-errors'; // Error class for handling authentication errors.
import User from '../models/User.js'; // Mongoose model for the User collection.

// Interface for the arguments of the login mutation.
interface LoginUserArgs {
    email: string; // The email address of the user.
    password: string; // The password of the user.
}

// Interface for the arguments of the addUser mutation.
interface AddUserArgs {
    input: {
        username: string; // The username of the new user.
        email: string; // The email address of the new user.
        password: string; // The password of the new user.
    };
}

// Interface for the arguments of the saveBook mutation.
interface SaveBookArgs {
    input: {
        authors: string[]; // An array of authors of the book.
        description: string; // A brief description of the book.
        title: string; // The title of the book.
        bookId: string; // The unique ID of the book (from Google Books API).
        image?: string; // A URL to the book's cover image (optional).
        link?: string; // A URL to the book's page on the Google Books website (optional).
    };
}

// Define the resolvers for the GraphQL API.
const resolvers = {
    // Query resolvers handle fetching data.
    Query: {
        // Resolver for the `me` query to fetch the logged-in user's data.
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate(
                    'savedBooks'
                );
            }

            throw new AuthenticationError('Could not authenticate user.');
        },
    },

    // Mutation resolvers handle modifying data.
    Mutation: {
        // Resolver for the `login` mutation to authenticate a user.
        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError(
                    'Incorrect email. Could not authenticate user.'
                );
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError(
                    'Incorrect password. Could not authenticate user.'
                );
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        // Resolver for the `addUser` mutation to register a new user.
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            console.log('resolvers input: ', input);
            try {
                const { username, email, password } = input;

                const existing = await User.findOne({ email });
                if (existing) {
                    console.warn(
                        'Registration attempt with existing email:',
                        email
                    );
                    throw new AuthenticationError('Email is already in use');
                }

                const user = await User.create({ username, email, password });
                console.log('resolvers user: ', user);

                const token = signToken(user.username, user.email, user._id);
                console.log('resolvers token: ', token);

                return { token, user };
            } catch (err) {
                console.error('Registration error:', err);
                throw new Error('User registration failed');
            }
        },

        // Resolver for the `saveBook` mutation to save a book to the user's account.
        saveBook: async (
            _parent: any,
            { input }: SaveBookArgs,
            context: any
        ) => {
            if (!context.user) {
                throw new AuthenticationError(
                    'You need to be logged in to save a book.'
                );
            }

            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } }, // Add the book to the savedBooks array if it doesn't already exist.
                { new: true }
            ).populate('savedBooks');

            return updatedUser;
        },

        // Resolver for the `removeBook` mutation to remove a saved book from the user's account.
        removeBook: async (
            _parent: any,
            { bookId }: { bookId: string },
            context: any
        ) => {
            if (!context.user) {
                throw new AuthenticationError(
                    'You need to be logged in to remove a saved book.'
                );
            }

            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } }, // Remove the book with the specified bookId from the savedBooks array.
                { new: true }
            );

            return updatedUser;
        },
    },
};

export default resolvers;
