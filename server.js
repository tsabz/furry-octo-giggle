const express = require('express');
const mongoose = require('mongoose');

//CONFIGURATION =========================
require('dotenv').config();
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3333;
const MONGODB_URI = process.env.MONGODB_URI;
const session = require('express-session');

// *** MIDDLEWARE *** //
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

// *** mongoose connect *** //
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
mongoose.connection.once('open', ()=>{
    console.log('ACCESS TO MONGOD GRANTED!');
});

// Connect to routers //
const quotesController = require('./controllers/quotes.js');
app.use('/quotes', quotesController);

const userController = require('./controllers/users.js');
app.use('/user', userController);

const sessionController = require('./controllers/sessions.js');
app.use('/session', sessionController);

// *** CONNECTON *** //
app.listen(PORT, ()=>{
    console.log('COMMONPLACEBOOK-SUCCESS!!, LISTENING ON PORT', PORT);
});
