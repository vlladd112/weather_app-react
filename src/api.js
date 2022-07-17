const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// get current geolocation
export const currentLocationCoords = (setLocation) => {
    navigator.geolocation.getCurrentPosition(location => {
        setLocation(location.coords);
    })
};

// get weather data
export const getLocalWeatherUrl = (coords, language, unit) => `${baseUrl}?lat=${coords?.latitude}&lon=${coords?.longitude}&units=${unit}&lang=${language}&appid=ad232c5285db15075e3e2ece306f1649`;
export const getWeatherUrl = (location, language, unit) => `${baseUrl}?q=${location}&units=${unit}&lang=${language}&appid=ad232c5285db15075e3e2ece306f1649`;
