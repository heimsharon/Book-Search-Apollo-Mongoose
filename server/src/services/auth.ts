// Filepath: server/src/services/auth.ts
// This file provides authentication-related utilities for the application.
// It includes functions for token generation, token authentication, and a custom error class for handling authentication errors.

import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from a .env file.

const secretKey: string = process.env.JWT_SECRET_KEY || 'secret'; // Secret key for signing and verifying JWTs.

// Middleware function to authenticate a token from the request.
export const authenticateToken = ({ req }: { req: Request }) => {
    let token = req.body.token || req.query.token || req.headers.authorization; // Retrieve the token from the request body, query, or headers.

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim(); // Extract the token from the "Bearer <token>" format.
    }

    if (!token) {
        console.log('No token to authenticate.'); // Log if no token is provided.
        return req; // Return the request object without modifying it.
    }

    try {
        // Verify the token and extract the payload.
        const { data }: any = jwt.verify(token, secretKey, { maxAge: '2hr' }); // Token expires in 2 hours.
        console.log('data: ', data); // Log the decoded data.
        req.user = data; // Attach the user data to the request object.
    } catch (err) {
        console.error('Invalid token. ', err); // Log an error if the token is invalid.
    }

    return req; // Return the modified request object.
};

// Function to sign a new JWT with user data.
export const signToken = (username: string, email: string, _id: unknown) => {
    const payload = { username, email, _id }; // Payload containing user information.
    return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' }); // Sign the token with a 2-hour expiration.
};

// Custom error class for handling authentication errors in GraphQL.
export class AuthenticationError extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: { code: 'UNAUTHENTICATED' }
        }); // Set the error code to "UNAUTHENTICATED".
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' }); // Set the error name to "AuthenticationError".
    }
}
