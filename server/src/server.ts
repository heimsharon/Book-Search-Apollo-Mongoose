// Filepath: server/src/server.ts
// This file sets up and starts the Express server with Apollo Server for handling GraphQL requests.
// It also configures middleware, database connection, and static file serving for production.

import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from a .env file.

const app = express(); // Initialize the Express application.
const PORT = process.env.PORT || 3001; // Set the server port, defaulting to 3001 if not specified in the environment variables.

// Resolve the current file and directory paths.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Apollo Server with type definitions and resolvers.
const server = new ApolloServer({
    typeDefs, // GraphQL schema definitions.
    resolvers, // GraphQL resolvers for handling queries and mutations.
});

// Function to start the Apollo Server and configure the Express application.
const startApolloServer = async () => {
    await server.start(); // Start the Apollo Server.
    await db; // Ensure the database connection is established.

    // Middleware to parse incoming requests with URL-encoded payloads and JSON payloads.
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Middleware for handling GraphQL requests at the `/graphql` endpoint.
    app.use(
        '/graphql',
        expressMiddleware(server as any, {
            context: authenticateToken as any, // Attach the authentication middleware to the GraphQL context.
        })
    );

    // Serve static files in production mode.
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../../client/dist'))); // Serve the client build directory.

        // Handle all other routes by serving the React app's `index.html`.
        app.get('*', (_req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        });
    }

    // Start the Express server and log the server details.
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};

// Start the Apollo Server and Express application.
startApolloServer();
