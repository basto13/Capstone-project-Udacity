# Travel App Project

This project is a travel app that obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.


## Composition of code
For this task I have used the starter code produced by Udacity and following steps were made:
1. Set up environment
2. Set POST and GET routes on the server part
3. Acquire API credentials to retrieve the weather data from 3 services.
4. Chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to the app
5. Chain another Promise that updates the UI dynamically

## Run project
Below shows how to run in development and production mode.
### run in development mode
To start the webpack dev server at port 8000

` $ npm run build-dev`

### run in production mode
Generate the dist files and then start server in production mood

` $ npm run build-prod`
` $ npm run start`

## Configs
There are two webpack config files for both development mode(`webpack.config.dev.js`) and production mode(`webpack.config.prod.js` ) in this project.

## Offline Functionality
The project have service workers set up in webpack to provide the offline functionality of our app.

## Testing

Testing is done with Jest. To run test, use the command 

`npm run test`. 
