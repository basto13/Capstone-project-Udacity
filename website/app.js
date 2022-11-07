/* Global Variables */

// Create a new date instance dynamically with JS
const day = new Date();
const date = day.toDateString();

// const generate = document.querySelector('#generate');

//Integrating OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
// Personal API Key for OpenWeatherMap API
const apiKey = 'de5683bc889177b5b2544a6d1fb13366';


document.getElementById('generate').addEventListener('click', performAction);

async function performAction(e) {
    e.preventDefault();
    // get input values
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
    //call function to get Web API Data
    getWeather(baseURL, zip, apiKey)
        // add data to post request
        .then(function (data) {
            postData('/add', { date, temp: data.main.temp, feelings })
                // update UI in browser
                .then(function () {
                    updateUI();
                })
        })
}

const getWeather = async (baseURL, zip, apiKey) => {
    const response = await fetch(baseURL + new URLSearchParams({
        zip: zip,
        appid: apiKey
    }))
    try {
        const responseJson = await response.json()
        // console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.log("error", error)
    }
}

// client's side function to post data 
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            feelings: data.feelings,
        })
    })
    try {
        const newData = await response.json();
        console.log("newData is: ", newData)
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON 
        const allData = await request.json()
        console.log(allData)
        // show icons on the page
        // updated data to DOM elements
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
        document.getElementById('content').innerHTML = allData.feelings;
    }
    catch (error) {
        console.log("error", error);
    }
};
