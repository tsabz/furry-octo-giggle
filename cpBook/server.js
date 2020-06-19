const express = require('express');
const app = express();
const mongoose = require('mongoose');


// *** MIDDLEWARE *** //
const quotesController = require('./controllers/quotes.js');

app.use('/quotes', quotesController);
app.use(express.json());








// *** mongoose connect *** //
mongoose.connect('mongodb://localhost:27017/cpbook', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=>{
    console.log('ACCESS TO MONGOD GRANTED!');
});

// *** CONNECTON *** //
app.listen(3000, ()=>{
    console.log('COMMONPLACEBOOK-SUCCESS!!');
});
