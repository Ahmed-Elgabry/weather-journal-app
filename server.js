// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;

/* Spin up the server*/
const server = app.listen(port, () => {
   // console.log(server);
    console.log(`running to http://localhost:${port}`);
});

// GET route
app.get('/all', (req, res) => {res.send(projectData)});

// POST route
app.post('/all', (req, res) => {
    res.send(projectData)
    projectData = req.body
    console.log(projectData);
});