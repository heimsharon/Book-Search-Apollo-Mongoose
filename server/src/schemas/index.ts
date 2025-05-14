// Filepath: server/src/schemas/index.ts
// This file imports the GraphQL type definitions and resolvers for the application.
// It exports them for use in the Apollo Server setup, enabling the server to handle GraphQL queries and mutations.

import typeDefs from './typeDefs.js'; // Import the GraphQL type definitions.
import resolvers from './resolvers.js'; // Import the GraphQL resolvers.

export { typeDefs, resolvers }; // Export the type definitions and resolvers for use in the Apollo Server configuration.
