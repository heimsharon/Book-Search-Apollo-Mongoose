import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Add this line to parse incoming JSON requests
app.use(express.json());

// Enable CORS
app.use(
    cors({
        origin: 'https://book-search-apollo-mongoose.onrender.com',
        credentials: true,
    })
);

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () => {
    try {
        await server.start();

        // Connect to MongoDB using the URI from .env
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in the .env file');
        }

        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

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

        // Serve static files from the client build directory
        app.use(express.static(path.join(__dirname, '../../client/dist')));

        // Fallback to serve `index.html` for any unknown routes
        app.get('*', (_req, res) => {
            res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        });

        const PORT = parseInt(process.env.PORT || '3001', 10);
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error starting server:', (err as Error).message);
        process.exit(1); // Exit the process if the server fails to start
    }
};

startApolloServer();
