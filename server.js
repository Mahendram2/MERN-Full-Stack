///////////////////////////////
// Dependencies
////////////////////////////////
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan')


// Initalalize Express
const app = express();


// Config
require('dotenv').config();
const {PORT = 4000, DATABASE_URL} = process.env;


///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
mongoose.connect(DATABASE_URL);

mongoose.connection
.on('connected', () => console.log('Connected to MongoDB'))
.on('disconnected', () => console.log('Disonnected to MongoDB'))
.on('error', () => console.log('Problem with MongoDB:' + error.message))


///////////////////////////////
// Model
////////////////////////////////
const peopleSchema = new mongoose.Schema({
    name: String,
    image: 
    {type:String, 
        default:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"},
    title: String,
},{timestamps: true});

const People = mongoose.model('People', peopleSchema)


///////////////////////////////
// Mount Middleware
////////////////////////////////
app.use(express.json());
// ^ This middleware intercepts incoming json request bodies and turns them into req.body

app.use(logger('dev'));

///////////////////////////////
// ROUTES
////////////////////////////////
app.get('/', (req, res) => {
    res.send('Welcome');
});

// FULL CRUD Routes

// Index Route
app.get('/api/people', async (req,res) => {
   try {
       res.status(200).json(await People.find({}));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});
}
// People.find({}, (err, people) => {
    //     res.status(200).json(people)
    // });
});

// Create Route
app.post('/api/people', async (req, res) =>{
    try {
        res.status(201).json(await People.create(req.body));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'});
    }
});

// Updates Route
app.put('/api/people/:id', async (req,res) => {
    try {
        res.status(200).json(await People.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        ));
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'}); 
    }
});

// Delete Route
app.delete('/api/people/:id', async (req,res) => {
    try {
        res.status(200).json(await People.findByIdAndDelete(
            req.params.id
        ))
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': 'bad request'}); 
    }
});


///////////////////////////////
// Listener
////////////////////////////////
app.listen(PORT, () =>{
    console.log("Express is using Port:" + PORT);
});