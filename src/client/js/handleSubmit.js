// import {updateUI} from './updateUI'
import { postData } from './postData'

document.getElementById('submit').addEventListener('click', submitAction);

//Integrating OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
// Personal API Key for OpenWeatherMap API
const apiKey = 'de5683bc889177b5b2544a6d1fb13366';

const geoURL = 'http://api.geonames.org/searchJSON?';
const geoKey = 'olgabasto';

const weatherBitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const weatherBitKey = 'accbe321d73d49a29297cf6938accd4a';

const pixaBayURL = 'https://pixabay.com/api/?';
const pixaBayKey = '31598097-feff6652b9ef670c811d36bb7';

function submitAction(event) {
    // get input values
    const notes = document.getElementById('notes').value;
    const city = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    //call function to get Web API Coordination Data 
    getCoordinates(geoURL, city, geoKey)
        // add data to post request
        .then(function (data) {
            //add variables to the code
            const lat = data.geonames[0].lat;
            const lng = data.geonames[0].lng;
            const cityName = data.geonames[0].name;
            const countryName = data.geonames[0].countryName;
            console.log('lat', lat, 'lng', lng, 'city', cityName, 'country', countryName)
            // post location data
            postData('/addLocation', { date, city: cityName, country: countryName, notes })
            // call function to get Web API Weather Data
            getWeather(weatherBitURL, lat, lng, weatherBitKey)
                // add data to post request
                .then(function (data) {
                    const temp = data.data[0].temp
                    console.log('temp', temp)
                    postData('/addWeather', { temp: temp })
                    getImage(pixaBayURL, city, pixaBayKey)
                    
                })
                
                // update UI in browser
                .then(function () {
                    updateUI();
                })
        })
};

const getWeather = async (baseURL, lat, lng, keyURL) => {
    const response = await fetch(baseURL + new URLSearchParams({
        lat: lat,
        lon: lng,
        key: keyURL
    }))
    try {
        const responseJson = await response.json()
        console.log(responseJson)
        console.log("success")
        return responseJson;
    } catch (error) {
        console.log("error", error)
    }
}

const getCoordinates = async (geoURL, city, geoKey) => {
    const response = await fetch(geoURL + new URLSearchParams({
        q: city,
        username: geoKey
    }))
    try {
        const responseJson = await response.json()
        return responseJson;
    } catch (error) {
        console.log("error", error)
    }
    await
        postData('/addLocation', { date, city: cityName, country: countryName, notes })
}

const getImage = async (baseURL, city, keyURL) => {
    const response = await fetch(baseURL + new URLSearchParams({
        key: keyURL,
        q: city
    }))
    try {
        const responseJson = await response.json()
        const image = responseJson.hits[0].webformatURL;
        console.log(image)
        console.log("image success")
        return responseJson;
    } catch (error) {
        console.log("error", error)
    }
}


const updateUI = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON 
        const allData = await request.json()
        // updated data to DOM elements      
        document.getElementById('notes').innerHTML = allData.notes;
    }
    catch (error) {
        console.log("error", error);
    }
};

export { submitAction };