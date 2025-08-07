// Vercel-compatible start script
const dotenv = require('dotenv');
const path = require('path');

// Set NODE_ENV if not already set
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

// Load the appropriate environment file
const envFile = process.env.NODE_ENV === 'production' ? 'config.prod.env' : 'config.env';
dotenv.config({ path: path.join(__dirname, `config/${envFile}`) });

// For Vercel, we need to export the app, not start a server
const app = require('./app');

module.exports = app;
