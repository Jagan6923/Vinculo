const mongoose = require('mongoose');

const connectDatabase = () => {
    // Use Atlas URI for cloud database, fallback to local URI for development
    const uri = process.env.DB_ATLAS_URI || process.env.DB_LOCAL_URI;
    
    console.log('Environment variables check:');
    console.log('  NODE_ENV:', process.env.NODE_ENV);
    console.log('  DB_ATLAS_URI:', process.env.DB_ATLAS_URI ? '✓ present' : '✗ missing');
    console.log('  DB_LOCAL_URI:', process.env.DB_LOCAL_URI ? '✓ present' : '✗ missing');
    
    if (!uri) {
        const error = new Error('No database URI provided. Set DB_ATLAS_URI or DB_LOCAL_URI in environment variables');
        console.error('❌', error.message);
        return Promise.reject(error);
    }
    
    // Log sanitized URI
    const sanitizedUri = uri.replace(/\/\/.*@/, '//<credentials>@');
    console.log('Connecting to MongoDB:', sanitizedUri);
    
    // Return the promise so it can be awaited
    return mongoose.connect(uri, {
        maxPoolSize: 10,
        minPoolSize: 2,
        serverSelectionTimeoutMS: 5000,
    })
        .then(con => {
            console.log(`✓ MongoDB connected to: ${con.connection.host}`);
            return con;
        })
        .catch(err => {
            console.error('❌ MongoDB connection failed:', err.message);
            // In serverless, don't exit the process - throw the error instead
            throw err;
        });
};

module.exports = connectDatabase;
