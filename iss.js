const request = require('request');
const api = 'https://api.ipify.org?format=json';
const geoAPIEndpoint = "http://ipwho.is/";

const issAPI = 'https://iss-flyover.herokuapp.com/json/';

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request(api, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) return callback(error, null);

    // if non-200 status, assume server error
    if (!(response.statusCode >= 200 || response.statusCode < 300)) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};


// takes in an IP address and returns the latitude and longitude for it.
const fetchCoordsByIP = function(ip, callback) {
  const geoAPI = `${geoAPIEndpoint}${ip}`;
  request(geoAPI, (error, response, body) => {
    if (error) return callback(error, null);

    const parsedBody = JSON.parse(body);

    // invalid IP data
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${body.message}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;
    callback(error, {latitude, longitude});
    
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const issAPIQuery = `${issAPI}?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(issAPIQuery, (error, response, body) => {
    const parsedBody = JSON.parse(body);

    if (error) return callback(error, null);

    if (!(response.statusCode >= 200 || response.statusCode < 300)) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    if (parsedBody === "invalid coordinates") {
      const message = "Invalid coordinates!";
      return callback(Error(message), null);
    }

    if (isNaN(coords.latitude)) {
      const message = "Invalid latitude";
      return callback(Error(message), null);
    }
    
    if (isNaN(coords.longitude)) {
      const message = "Invalid longitude";
      return callback(Error(message), null);
    }

    const flyOverTimesArray = parsedBody["response"];
    callback(error, flyOverTimesArray);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function() {

}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };