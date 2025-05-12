// Filepath: server/src/services/auth.ts
// This file contains functions for handling JWT authentication, including signing and verifying tokens

import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
import { JwtPayload } from '../types/interfaces';
dotenv.config();



// Function to authenticate the token and return the user
export const authenticateToken = (authHeader: string | undefined): JwtPayload | null => {
  if (!authHeader) {
    throw new GraphQLError('Authorization header is missing', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    const user = jwt.verify(token, secretKey) as JwtPayload;
    return user; // Return the decoded user payload
  } catch (err) {
    throw new GraphQLError('Invalid or expired token', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
};

// Function to sign a new token
export const signToken = (username: string, email: string, _id: string): string => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
