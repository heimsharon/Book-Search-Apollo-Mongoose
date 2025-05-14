//Filepath: client/src/main.tsx

// This file serves as the entry point for the React application.
// It sets up the React Router for navigation and renders the application to the DOM.

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

// Define the routes for the application using React Router.
const router = createBrowserRouter([
    {
        path: '/', // Root path of the application.
        element: <App />, // The main application layout.
        errorElement: <h1 className="display-2">Wrong page!</h1>, // Error element displayed for invalid routes.
        children: [
            {
                index: true, // Default route for the root path.
                element: <SearchBooks />, // Component rendered for the search books page.
            },
            {
                path: '/saved', // Route for the saved books page.
                element: <SavedBooks />, // Component rendered for the saved books page.
            },
        ],
    },
]);

// Render the application to the DOM and provide the router configuration.
ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} /> // Provide the router to the application.
);
