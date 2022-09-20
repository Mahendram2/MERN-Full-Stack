// Deoendenices
const express = require('express');
const mongoose = require('mongoose');

// Initalalize Express
const app = express();

// Config
require('dotenv').config();
const {PORT = 4000, DATABASE_URL} = process.env;

// Connect Mongodb
mongoose.connect(DATABASE_URL);

mongoose.connection
.on('connected', () => console.log('Connected to MongoDB'))
.on('disconnected', () => console.log('Disonnected to MongoDB'))
.on('error', () => console.log('Problem with MongoDB:' + error.message))

// Mount Middleware

///////////////////////////////
// ROUTES
////////////////////////////////
app.get('/', (req, res) => {
    res.send('Welcome');
});

///////////////////////////////
// Listener
////////////////////////////////
app.listen(PORT, () =>{
    console.log("Express is using Port:" + PORT);
});