// Filepath: server/src/schemas/resolvers.ts

import { JwtPayload } from '../types/interfaces';
import { GraphQLError } from 'graphql';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';

const resolvers = {
    Query: {
        // Resolver for fetching a single user
        getSingleUser: async (_parent: unknown, args: { id?: string; username?: string }, context: { user: JwtPayload }) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            try {
                const foundUser = await User.findOne({
                    $or: [{ _id: args.id }, { username: args.username }],
                });

                if (!foundUser) {
                    throw new GraphQLError('Cannot find a user with this id or username', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }

                return foundUser;
            } catch (err) {
                throw new GraphQLError('Error fetching user', {
                    extensions: { code: 'INTERNAL_SERVER_ERROR', details: err },
                });
            }
        },

        me: (_parent: unknown, _args: unknown, context: { user: JwtPayload }) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }
            return context.user; // Return the authenticated user's data
        },
    },

    Mutation: {
        // Resolver for creating a user
        createUser: async (_parent: unknown, args: { username: string; email: string; password: string }) => {
            try {
                const user = await User.create(args);

                if (!user) {
                    throw new GraphQLError('Error creating user', {
                        extensions: { code: 'BAD_REQUEST' },
                    });
                }

                const token = signToken(user.username, user.email, user._id);
                return { token, user };
            } catch (err) {
                throw new GraphQLError('Error creating user', {
                    extensions: { code: 'INTERNAL_SERVER_ERROR', details: err },
                });
            }
        },

        // Resolver for saving a book
        saveBook: async (_parent: unknown, args: { book: any }, context: { user: JwtPayload }) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.book } },
                    { new: true, runValidators: true }
                );

                if (!updatedUser) {
                    throw new GraphQLError('Error saving book', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }

                return updatedUser;
            } catch (err) {
                throw new GraphQLError('Error saving book', {
                    extensions: { code: 'INTERNAL_SERVER_ERROR', details: err },
                });
            }
        },

        // Resolver for deleting a book
        deleteBook: async (_parent: unknown, args: { bookId: string }, context: { user: JwtPayload }) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );

                if (!updatedUser) {
                    throw new GraphQLError('Error deleting book', {
                        extensions: { code: 'NOT_FOUND' },
                    });
                }

                return updatedUser;
            } catch (err) {
                throw new GraphQLError('Error deleting book', {
                    extensions: { code: 'INTERNAL_SERVER_ERROR', details: err },
                });
            }
        },
    },
};

export default resolvers;