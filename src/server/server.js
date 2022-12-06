// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

console.log(__dirname)

// Setup empty JS object to act as endpoint for all routes
// projectData = {};

// Setup Server
const port = 3000;

const projectData = {};

//Spin up the server
const server = app.listen(port, listening);
//callback to debug
function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
    return true
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const getAll = async (req, res) => {
    if (projectData) {
        res.send(projectData);
    }
}

// GET route 
app.get("/all", getAll);

app.post('/addLocation', async (req, res) => {
    const data = await req.body;
    console.log("server side location data posted", data);
    projectData['date'] = data.date;
    projectData['city'] = data.city;
    projectData['country'] = data.country;
    projectData['notes'] = data.notes;
    res.send(projectData);
});

app.post('/addWeather', async (req, res) => {
    const data = await req.body;
    projectData['temp'] = data.temp;
    console.log("server side Weather data posted", data);
    res.send(projectData);
});

app.post('/addImage', async (req, res) => {
    const data = await req.body;
    projectData['imageURL'] = data.imageURL;
    console.log("server side Image data posted", data);
    res.send(projectData);
});

module.exports = {getAll};