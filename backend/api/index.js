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
        throw error; // Re-throw to allow proper error handling
    }
};

// Export handler for Vercel
module.exports = (req, res) => {
    try {
        connectDB()
            .then(() => {
                // Pass request to Express app
                return app(req, res);
            })
            .catch((err) => {
                console.error('Unhandled error:', err);
                if (!res.headersSent) {
                    res.status(500).json({ 
                        error: 'Internal Server Error',
                        details: process.env.NODE_ENV === 'development' ? err.message : undefined
                    });
                }
            });
    } catch (error) {
        console.error('Sync error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
