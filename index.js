const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP: ", ip);
});

fetchCoordsByIP('72.136.1.19', (error, coordinates) => {
  if (error) {
    console.log("It didn't work! Error: ", error);
    return;
  }
  console.log("It worked! Returned coordinates: ", coordinates);
});

//test
// const coords = { latitude: '32.7766642', longitude: '-96.7969879' }
// const coords = { latitude: '12', longitude: 'a' }
const coords =  { latitude: 43.467517, longitude: -79.6876659 };
fetchISSFlyOverTimes(coords, (error, output) => {
  if (error) {
    console.log("It didn't work! Error: ", error);
    return;
  }
  console.log("It worked!");
  console.log(output);
});