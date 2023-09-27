const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
//Database Connection

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/trailhead', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected!');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;