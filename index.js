const express = require('express');
const connectDB = require('./config/db');
const challengesRouter = require('./routes/challenges');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth');

const app = express();

// Connexion à la base de données
connectDB();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes pour les défis d'éco-conception
app.use('/challenges', challengesRouter);

app.use('/auth', authRoutes);

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Route protégée' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
