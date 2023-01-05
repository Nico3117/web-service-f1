const express = require('express'); // framework
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); // creation de l'application grace au framework

const dbID = process.env.DB_ID;
const dbPW = process.env.DB_PW;
const DB = 'mongodb+srv://'+dbID+':'+dbPW+'@cluster0.gy1tyef.mongodb.net/test';

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err)
    });

app.use(bodyParser.json());

// import des routes
const userRoutes = require('./routes/user');

app.use('/api/auth', userRoutes);

// exportation pour être utilisé par d'autres fichiers
module.exports = app;