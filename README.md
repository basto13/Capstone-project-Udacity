# Weather-Journal App Project

This project required to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 
In detailes, Web APIs and asynchronous functions were added, specifically, OpenWeatherMap API was implemented to get weather based on the ZIP index of the city (in the USA). Dynamic UI update is also incorporated. 

## Composition of code
For this task I have used the starter code produced by Udacity and following steps were made:
1. Set up environment
2. Set POST and GET routes on the server part
3. Acquire OpenWeatherMap API credentials to retrieve the weather data
4. Chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to the app
5. Chain another Promise that updates the UI dynamically
