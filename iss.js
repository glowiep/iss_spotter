const { parse } = require('path');
const request = require('request');
const api = 'https://api.ipify.org?format=json';
const geoAPIEndpoint = "http://ipwho.is/";
//const geoAPIEndpoint = "https://ipwho.is/42";  //test

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

module.exports = { fetchMyIP, fetchCoordsByIP };