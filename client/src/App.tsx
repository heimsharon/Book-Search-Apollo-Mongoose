//Filepath: client/src/app.tsx
// This file serves as the main entry point for the React application.
// It sets up the Apollo Client for GraphQL communication, provides global state management, and renders the main layout.

import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'; // Utility for setting the context for Apollo requests (e.g., adding authentication headers).

// Create an HTTP link to the GraphQL API endpoint.
const httpLink = createHttpLink({
    uri: '/graphql', // The URI for the GraphQL API.
});

// Middleware to attach the authentication token to the headers of each GraphQL request.
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token'); // Retrieve the token from localStorage.
    return {
        headers: {
            ...headers, // Preserve existing headers.
            authorization: token ? `Bearer ${token}` : '', // Add the token to the Authorization header if it exists.
        },
    };
});

// Initialize the Apollo Client with the HTTP link and authentication middleware.
const client = new ApolloClient({
    link: authLink.concat(httpLink), // Combine the authLink and httpLink.
    cache: new InMemoryCache(), // Set up an in-memory cache for efficient data management.
});

// The main App component that wraps the application with the ApolloProvider and renders the layout.
function App() {
    return (
        <ApolloProvider client={client}>
            {/* Provide the Apollo Client to the entire application */}
            <div className="flex-column justify-flex-start min-100-vh">
                <Navbar /> {/* Render the navigation bar */}
                <div className="container">
                    <Outlet /> {/* Render the child routes */}
                </div>
            </div>
        </ApolloProvider>
    );
}

export default App;
