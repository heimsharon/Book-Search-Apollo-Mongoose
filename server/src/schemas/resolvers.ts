// Filepath: server/src/schemas/resolvers.ts

import { JwtPayload } from '../types/interfaces';
import { GraphQLError } from 'graphql';
import {
    getSingleUser as getSingleUserController,
    createUser as createUserController,
    saveBook as saveBookController,
    deleteBook as deleteBookController,
} from '../controllers/user-controller.js';

const resolvers = {
    Query: {
        // Resolver for fetching a single user
        getSingleUser: async (_parent: unknown, args: { id?: string; username?: string }, context: { user: JwtPayload }) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            // Call the controller function
            const req = { user: context.user, params: args } as any;
            const res = {
                json: (data: any) => data,
                status: (code: number) => ({ json: (data: any) => ({ code, data }) }),
            } as any;

            return await getSingleUserController(req, res);
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
            const req = { body: args } as any;
            const res = {
                json: (data: any) => data,
                status: (code: number) => ({ json: (data: any) => ({ code, data }) }),
            } as any;

            return await createUserController(req, res);
        },

        // Resolver for saving a book
        saveBook: async (_parent: unknown, args: { book: any }, context: { user: JwtPayload }) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            const req = { user: context.user, body: args.book } as any;
            const res = {
                json: (data: any) => data,
                status: (code: number) => ({ json: (data: any) => ({ code, data }) }),
            } as any;

            return await saveBookController(req, res);
        },

        // Resolver for deleting a book
        deleteBook: async (_parent: unknown, args: { bookId: string }, context: { user: JwtPayload }) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            const req = { user: context.user, params: { bookId: args.bookId } } as any;
            const res = {
                json: (data: any) => data,
                status: (code: number) => ({ json: (data: any) => ({ code, data }) }),
            } as any;

            return await deleteBookController(req, res);
        },
    },
};

export default resolvers;