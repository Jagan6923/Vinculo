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
    const requestId = `${Date.now()}`;
    
    try {
        console.log(`[${requestId}] connectDB called, isConnected=${isConnected}`);
        
        // If already connected, return immediately
        if (isConnected && mongoose.connections[0].readyState === 1) {
            console.log(`[${requestId}] Using existing database connection`);
            return;
        }
        
        console.log(`[${requestId}] Current connection state:`, mongoose.connections[0].readyState);
        console.log(`[${requestId}] Calling connectDatabase()...`);
        
        const result = await connectDatabase();
        isConnected = true;
        
        console.log(`[${requestId}] Database connected successfully`);
        return result;
        
    } catch (error) {
        console.error(`[${requestId}] Database connection error:`, error.message);
        isConnected = false;
        throw error;
    }
};

// Export handler for Vercel
module.exports = async (req, res) => {
    const timestamp = new Date().toISOString();
    const requestId = process.env.VERCEL_TRACE_ID || `${Date.now()}`;
    
    console.log(`\n========================================`);
    console.log(`[${timestamp}] Request ID: ${requestId}`);
    console.log(`[${requestId}] ${req.method} ${req.url}`);
    console.log(`[${requestId}] Headers:`, req.headers);
    
    try {
        console.log(`[${requestId}] Connecting to database...`);
        
        // Connect to database
        await connectDB();
        
        console.log(`[${requestId}] Database connected, passing to Express app`);
        
        // Pass request to Express app
        // The app will handle the response
        app(req, res);
        
        console.log(`[${requestId}] Express app called`);
        
    } catch (error) {
        console.error(`\n[${requestId}] FATAL ERROR`);
        console.error(`[${requestId}] Error Name:`, error.name);
        console.error(`[${requestId}] Error Message:`, error.message);
        console.error(`[${requestId}] Error Stack:`, error.stack);
        
        if (!res.headersSent) {
            const errorResponse = {
                success: false,
                error: 'Internal Server Error',
                message: error.message,
                requestId: requestId,
                timestamp: timestamp
            };
            console.error(`[${requestId}] Sending error response:`, errorResponse);
            res.status(500).json(errorResponse);
        } else {
            console.error(`[${requestId}] Headers already sent, cannot send error response`);
        }
    }
    
    console.log(`========================================\n`);
};
