const request = require('request-promise-native');
const api = 'https://api.ipify.org?format=json';
const geoAPIEndpoint = "http://ipwho.is/";
const issAPI = 'https://iss-flyover.herokuapp.com/json/';

const fetchMyIP = function() {
  return request(api);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const geoAPI = `${geoAPIEndpoint}${ip}`;
  return request(geoAPI);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  return request(`${issAPI}?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };