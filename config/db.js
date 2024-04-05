// config/db.js
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./constants');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed: ', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;