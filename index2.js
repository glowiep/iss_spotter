const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printIISTimes } = require('./index');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printIISTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });