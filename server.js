// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

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

// Middleware d'authentification JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

// Route de connexion
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Ici, vous devrez rechercher l'utilisateur dans la base de données et vérifier si le mot de passe est correct
    // Si l'authentification réussit, générez un JWT et renvoyez-le au client
    // Veuillez consulter l'exemple donné précédemment pour implémenter cette fonctionnalité
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ajouter, modifier et supprimer des défis (routes protégées)

// Ajouter un défi
app.post('/challenge', authenticateToken, async (req, res) => {
  // Vérifiez que l'utilisateur est authentifié avant d'ajouter un défi
  try {
    const { title, description } = req.body;
    const challenge = new Challenge({ title, description });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Modifier un défi
app.patch('/challenge/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedChallenge = await Challenge.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(updatedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un défi
app.delete('/challenge/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Challenge.findByIdAndDelete(id);
    res.json({ message: 'Challenge deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
