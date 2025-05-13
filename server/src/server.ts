import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

        // Connect to MongoDB
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in the .env file');
        }
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Apply Apollo Server middleware
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

        // Serve static files in production
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '../../client/dist')));
            app.get('*', (_req, res) => {
                res.sendFile(
                    path.join(__dirname, '../../client/dist/index.html')
                );
            });
        }

        // Start the server
        const PORT = parseInt(process.env.PORT || '3001', 10);
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error starting server:', (err as Error).message);
        process.exit(1);
    }
};

startApolloServer();
