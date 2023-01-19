const express = require('express'); // framework
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require("./logger");
require('dotenv').config();

const app = express(); // creation de l'application grace au framework

// Passby CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, x-access-token, Authorization, UserID, Email');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const dbID = process.env.DB_ID;
const dbPW = process.env.DB_PW;
const DB = 'mongodb+srv://'+dbID+':'+dbPW+'@cluster0.gy1tyef.mongodb.net/test';

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => [console.log('Connected to MongoDB'),  
    logger.info("Connecté à MongoDB")])
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err)
        logger.error("Erreur de connexion à MongoDB");
    });

app.use(bodyParser.json());

// import des routes
const userRoutes = require('./routes/user');
const circuitRoutes = require('./routes/circuit');

app.use('/api/auth', userRoutes);
app.use('/api/circuit', circuitRoutes);

// exportation pour être utilisé par d'autres fichiers
module.exports = app;