import { JwtPayload } from '../services/auth';
import { GraphQLError } from 'graphql';
import { User } from '../models/User';


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