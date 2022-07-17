// const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// get current geolocation
export const currentLocationCoords = (setLocation) => {
    navigator.geolocation.getCurrentPosition(location => {
        setLocation(location.coords);
    })};
