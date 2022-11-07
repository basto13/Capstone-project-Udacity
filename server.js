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
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Setup Server
const port = 3000;

//Spin up the server
const server = app.listen(port, listening);
//callback to debug
function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
    return true
}

// POST route

// app.post('/add', addWeather);

// function addWeather(req,res){
//     console.log(req.body)
//     newEntry={
//         date: req.body.date,
//         temp: req.body.temp,
//         feelings: req.body.feelings,
//     }
//     projectData.push(newEntry)
//     res.send(projectData)
//     console.log(projectData)
// }

app.post('/add', async (req, res) => {
    const data = await req.body;
    console.log("server side data posted", data);
    projectData['date'] = data.date;
    projectData['temp'] = data.temp;
    projectData['feelings'] = data.feelings;
    res.send(projectData);
});

// GET route 
app.get("/all", async (req, res) => {
    if (projectData) {
        res.send(projectData);
    }
});

