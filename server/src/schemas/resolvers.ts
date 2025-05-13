// Filepath: server/src/schemas/resolvers.ts

import { GraphQLError } from 'graphql';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';
import type { JwtPayload } from '../types/interfaces';

const resolvers = {
    Query: {
        me: async (
            _parent: unknown,
            _args: unknown,
            context: { user: JwtPayload | null }
        ) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            const user = await User.findById(context.user._id);
            if (!user) {
                throw new GraphQLError('User not found', {
                    extensions: { code: 'NOT_FOUND' },
                });
            }

            return user;
        },
    },

    Mutation: {
        login: async (
            _parent: unknown,
            { email, password }: { email: string; password: string }
        ) => {
            const user = await User.findOne({ email }) as { username: string; email: string; _id: string; isCorrectPassword: (password: string) => Promise<boolean> } | null;
            if (!user) {
                throw new GraphQLError('Invalid credentials', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }
            if (!user) {
                throw new GraphQLError('Invalid credentials', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            const isValidPassword = await user.isCorrectPassword(password);
            if (!isValidPassword) {
                throw new GraphQLError('Invalid credentials', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            const token = signToken(
                user.username as string,
                user.email as string,
                user._id as string
            );
            return { token, user };
        },

        addUser: async (
            _parent: unknown,
            args: { username: string; email: string; password: string }
        ) => {
            const user = await User.create(args);
            const token = signToken(
                user.username as string,
                user.email as string,
                user._id as string
            );
            return { token, user };
        },

        saveBook: async (
            _parent: unknown,
            { input }: { input: any },
            context: { user: JwtPayload | null }
        ) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
            );

            return updatedUser;
        },

        removeBook: async (
            _parent: unknown,
            { bookId }: { bookId: string },
            context: { user: JwtPayload | null }
        ) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );

            return updatedUser;
        },
    },
};

export default resolvers;
