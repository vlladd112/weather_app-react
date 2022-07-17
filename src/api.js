// import { useEffect, useState } from 'react';

// const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// get geolocation

// const [currentLocation, setCurrentLocation] = useState(null);

// useEffect(() => {
//     navigator.geolocation.getCurrentPosition(location => {
//       setCurrentLocation(location.coords);
//       console.log(currentLocation)
//     })
//   }, [] )

// geoLocation();


export const currentLocationCoords = (setLocation) => {
    navigator.geolocation.getCurrentPosition(location => {
        setLocation(location.coords);
        })};

// useEffect(() => {
//     navigator.geolocation.getCurrentPosition(location => {
//       console.log(location.coords);
//     })
//   }, [] );


// navigator.geolocation.getCurrentPosition(location => {
//     return(location.coords);
// })