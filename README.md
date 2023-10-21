# Overview
The international space station (ISS) is an orbital outpost circling high above our heads and completes multiple revolutions around Earth per day. Sometimes it’s overhead, but when? It depends on your location. 

Given a location on Earth (latitude, longitude, and altitude) this app will compute the next number of times that the ISS will be overhead.

## The Approach
We'll be making API requests to three different services to solve this problem.

- Fetch our IP Address
- Fetch the geo coordinates (Latitude & Longitude) for our IP
- Fetch the next ISS flyovers for our geo coordinates


### Output
Running the app will produce an output like this:
```
> node index.js
Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
Next pass at Fri Jun 01 2021 14:36:08 GMT-0700 (Pacific Daylight Time) for 632 seconds!
Next pass at Fri Jun 01 2021 16:12:35 GMT-0700 (Pacific Daylight Time) for 648 seconds!
Next pass at Fri Jun 01 2021 17:49:29 GMT-0700 (Pacific Daylight Time) for 648 seconds!
Next pass at Fri Jun 01 2021 19:26:12 GMT-0700 (Pacific Daylight Time) for 643 seconds!
```

This is for all the space enthusiasts out there who are interested in spotting the International Space Station (ISS)!