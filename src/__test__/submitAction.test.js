// import { submitAction } from '../client/js/handleSubmit'

// const checkUrl = require('submitAction')


// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the submitAction() function", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(submitAction).toBeDefined();
    })});

    const validUrl = require('valid-url');

/**
 * 
 * @param {url} url : check the alleged url for its validity
 * @returns Boolean, true for valid url and false otherwise
 */
const isValidUrl = (url) => Boolean(validUrl.isWebUri(`${url}`));

module.exports = {
    isValidUrl,
};
