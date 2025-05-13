import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS
app.use(
    cors({
        origin: 'http://localhost:3000', // Allow requests from the client
        credentials: true, // Allow cookies and credentials
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

        app.use(
            '/graphql',
            expressMiddleware(server, {
                context: async ({ req }) => {
                    const authHeader = req.headers.authorization;
                    const user = authenticateToken(authHeader); // Ensure this function is working correctly
                    return { user };
                },
            })
        );

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error starting server:', err);
    }
};

startApolloServer();
