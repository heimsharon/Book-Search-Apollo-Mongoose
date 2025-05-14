// Filepath: server/src/config/connection.ts
// This file sets up the connection to the MongoDB database using Mongoose.

import mongoose from 'mongoose';

// Connect to the MongoDB database.
// Use the environment variable `MONGODB_URI` if available, otherwise default to the local MongoDB instance.
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks'
);

// Get the Mongoose connection instance.
const db = mongoose.connection;

// Event listener for connection errors.
db.on('error', (error) => {
    console.error('Connection error:', error); // Log the error to the console.
});

// Event listener for a successful connection.
db.once('open', () => {
    console.log('Connected to MongoDB'); // Log a success message when the connection is established.
});

// Export the database connection instance for use in other parts of the application.
export default db;
