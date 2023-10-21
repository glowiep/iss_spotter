const { nextISSTimesForMyLocation } = require('./iss');

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const printIISTimes = function(pastTimes) {
  for (const time of pastTimes) {
    const datetime = new Date(0);

    datetime.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${datetime} TIMEZONE for ${time.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  return printIISTimes(passTimes);
});