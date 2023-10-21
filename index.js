const { fetchMyIP, fetchCoordsByIP } = require('./iss');

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