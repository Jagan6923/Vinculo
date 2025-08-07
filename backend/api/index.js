// Vercel serverless function entry point
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Set NODE_ENV for production
process.env.NODE_ENV = 'production';

// Load production environment variables
dotenv.config({ path: path.join(__dirname, '../config/config.prod.env') });

// Import the app
const app = require('../app');

// Connect to database only if not already connected
const connectDatabase = require('../config/database');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        if (mongoose.connections[0].readyState !== 1) {
            await connectDatabase();
            isConnected = true;
            console.log('Database connected for serverless function');
        }
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Export handler for Vercel
module.exports = async (req, res) => {
    await connectDB();
    return app(req, res);
};
