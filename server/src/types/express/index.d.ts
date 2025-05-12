//Filepath: src/types/express/index.d.ts
// This file extends the Express Request object to include a user property; useful for middleware that needs to access user information from the request

declare namespace Express {
  interface Request {
    user: {
      _id: unknown;
      username: string;
    };
  }
}
