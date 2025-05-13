import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import dotenv from 'dotenv';
dotenv.config();

const secretKey: any = process.env.JWT_SECRET_KEY || 'secret';

export const authenticateToken = ({ req }: { req: Request }) => {
	let token = req.body.token || req.query.token || req.headers.authorization;

	if (req.headers.authorization) {
		token = token.split(' ').pop().trim();
	}

	if (!token) {
		console.log('No token to authenticate.');
		return req;
	}

	try {
		const { data }: any = jwt.verify(token, secretKey, { maxAge: '2hr' });
		console.log('data: ', data);
		req.user = data;
	} catch (err) {
		console.error('Invalid token. ', err);
	}

	return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
	const payload = { username, email, _id };
	return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
	constructor(message: string) {
		super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
		Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
	}
}