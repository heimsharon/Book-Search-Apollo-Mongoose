import mongoose from 'mongoose';

const db = mongoose;

db.set('strictQuery', false); // Suppress deprecation warnings for strictQuery

const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

db.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process if the connection fails
    });

export default db;
