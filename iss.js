const request = require('request');
const api = 'https://api.ipify.org?format=json';
const geoAPIEndpoint = "http://ipwho.is/";

const issAPI = 'https://iss-flyover.herokuapp.com/json/';


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

// ?lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE
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

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };