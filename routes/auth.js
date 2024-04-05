// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: 'Nom d\'utilisateur déjà utilisé' });
        }
      
        // Hasher le mot de passe
        console.log("Le mot de passe est : " + password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Le mot de passe hashé est : " + hashedPassword);

        // Créer un nouvel utilisateur
        const newUser = new User({ username, password: hashedPassword });
        console.log("Le mot de passe hasqsdqsdhé est : " + hashedPassword);
        await newUser.save();
        console.log("Le om d'utilisateur est : " + username + " et le mot de passe est : " + hashedPassword);
        
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    console.log('Received password:', password);
    console.log('Stored password:', user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
