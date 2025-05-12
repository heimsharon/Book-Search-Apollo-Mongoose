// Filepath: server/src/schemas/resolvers.ts

import { JwtPayload } from '../types/interfaces';
import { GraphQLError } from 'graphql';




const resolvers = {
    Query: {












        me: (_parent: unknown, _args: unknown, context: { user: JwtPayload }) => {
            if (!context.user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }
            return context.user; // Return the authenticated user's data
        },
    },
};

export default resolvers;