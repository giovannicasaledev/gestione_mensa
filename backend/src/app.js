const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const menuRoutes = require('./routes/menu.routes');
const createAdminIfNotExists = require('./utils/createAdmin');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menus', menuRoutes);

app.get('/', (req, res) => {
  res.send('Mensa backend API');
});

// Creazione automatica admin (all’avvio)
createAdminIfNotExists();

module.exports = app;
