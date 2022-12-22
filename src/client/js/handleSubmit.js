// import {updateUI} from './updateUI'
import { postData } from './postData'

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
            // post location data
            postData('/addLocation', { date, city: cityName, country: countryName, notes })
            // call function to get Web API Weather Data
            getWeather(weatherBitURL, lat, lng, weatherBitKey)
                // add data to post request
                .then(function (data) {
                    const temp = data.data[0].temp
                    postData('/addWeather', { temp: temp })
                    // call function to get Web API Image URL
                    getLocationImage(pixaBayURL, city, countryName, pixaBayKey)
                        .then(function (data) {
                                const imageURL = data.hits[0].webformatURL;
                                postData('/addImage', { imageURL: imageURL })
                        })
                        // update UI in browser
                        .then(function () {
                            updateUI();
                        })
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
}

const getLocationImage = async (baseURL, city, country, keyURL) => {
    const image = await getImage(baseURL, city, keyURL)
    if (image.totalHits > 0){return image}
    return await getImage(baseURL, country, keyURL)
}

const getImage = async (baseURL, location, keyURL) => {
    const response = await fetch(baseURL + new URLSearchParams({
        key: keyURL,
        q: location
    }))
    try {
        const responseJson = await response.json()
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
        document.getElementById('cityName').innerHTML = `I would like to visit: ${allData.city}`;
        document.getElementById('startDate').innerHTML = `My trip starts at ${allData.date}`;
        document.getElementById('temp').innerHTML = `The temperature is ${allData.temp}`;
        document.getElementById('content').innerHTML = `My notes about the trip: ${allData.notes}`;
        document.getElementById('image').setAttribute('src', allData.imageURL);

    }
    catch (error) {
        console.log("error", error);
    }
};

export { submitAction, getImage};