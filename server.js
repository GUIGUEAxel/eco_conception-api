// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./router/authRoutes');
const defiRoutes = require('./router/defiRoutes');
const { authenticateToken } = require('./middleware/Middleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {});

app.use(bodyParser.json());

// Routes pour l'authentification
app.use('/auth', authRoutes);

// Middleware d'authentification JWT pour les routes de défis
app.use('/defis', authenticateToken, defiRoutes);

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the server</h1>
    <p>Click the button below to see all challenges :</p>
    <a href="/challenges"><button>Challenges</button></a>

    <p>Click the button below to see random challenges :</p>
    <a href="/challenge/random"><button>Challenges random</button></a>

    <p>Click the button below to add challenge :</p>
    <a href="/challenge"><button>Ajouter un challenge</button></a>


    `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
