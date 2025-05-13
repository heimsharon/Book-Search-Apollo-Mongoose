import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () => {
    await server.start();
    await db();

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async ({ req }) => {
                const authHeader = req.headers.authorization;
                const user = authenticateToken(authHeader);
                return { user };
            },
        })
    );

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`GraphQL endpoint is http://localhost:${PORT}/graphql`);
    });
};

startApolloServer();
