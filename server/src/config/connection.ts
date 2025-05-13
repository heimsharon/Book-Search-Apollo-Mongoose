import mongoose from 'mongoose';

const db = mongoose;

db.set('strictQuery', false); // Optional: Suppress deprecation warnings for strictQuery

db.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

export default db;
