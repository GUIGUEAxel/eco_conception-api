// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define Challenge Schema
const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Challenge = mongoose.model('Challenge', challengeSchema);

// Routes
app.get('/challenge/random', async (req, res) => {
  try {
    const count = await Challenge.countDocuments();
    const random = Math.floor(Math.random() * count);
    const challenge = await Challenge.findOne().skip(random);
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add more routes for adding, modifying, deleting challenges (for authenticated users)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
