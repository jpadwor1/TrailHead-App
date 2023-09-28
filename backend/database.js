const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGODB_URI;
//Database Connection

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;