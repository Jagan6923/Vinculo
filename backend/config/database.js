const mongoose = require('mongoose');

const connectDatabase = () => {
    // Use Atlas URI for cloud database, fallback to local URI for development
    const uri = process.env.DB_ATLAS_URI || process.env.DB_LOCAL_URI;
    
    if (!uri) {
        return Promise.reject(new Error('No database URI provided. Set DB_ATLAS_URI or DB_LOCAL_URI'));
    }
    
    console.log("DB URI:", uri.replace(/\/\/.*@/, "//<credentials>@")); // ✅ Debug log (hide credentials)
    
    // Return the promise so it can be awaited
    return mongoose.connect(uri)
        .then(con => {
            console.log(`MongoDB is connected to the host: ${con.connection.host}`);
            return con;
        })
        .catch(err => {
            console.error("MongoDB connection failed:", err.message);
            // In serverless, don't exit the process - throw the error instead
            throw err;
        });
};

module.exports = connectDatabase;
