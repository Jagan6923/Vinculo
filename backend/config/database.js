const mongoose = require('mongoose');

const connectDatabase = () => {
    // Use Atlas URI for cloud database, fallback to local URI for development
    const uri = process.env.DB_ATLAS_URI || process.env.DB_LOCAL_URI;
    console.log("DB URI:", uri.replace(/\/\/.*@/, "//<credentials>@")); // ✅ Debug log (hide credentials)
    mongoose.connect(uri).then(con => {
        console.log(`MongoDB is connected to the host: ${con.connection.host}`);
    }).catch(err => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    });
};

module.exports = connectDatabase;
