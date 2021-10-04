// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder to point the server to
// app.use(express.json());
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log("Server Running");
    console.log(`Running on localhost: ${port}`);
};

// GET route
app.get('/app', getData);
function getData(req, res){
    console.log(projectData);
    res.send(projectData);
};

// POST route 
app.post('/app', function(req, res){
    console.log('I got a request!');
    console.log(req.body);
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
});