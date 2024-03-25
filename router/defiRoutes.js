// fichier defiRoutes.js

const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

router.get('/random', async (req, res) => {
  // Logique pour obtenir un défi aléatoire
});

// Autres routes liées aux défis

module.exports = router;
