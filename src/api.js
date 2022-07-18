const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// get current geolocation
export const currentLocationCoords = (setLocation) => {
    navigator.geolocation.getCurrentPosition(location => {
        setLocation(location.coords);
    })
};

// get weather data
export const getLocalWeatherUrl = (coords, language, unit) => `${baseUrl}?lat=${coords?.latitude}&lon=${coords?.longitude}&units=${unit}&lang=${language}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
export const getWeatherUrl = (location, language, unit) => `${baseUrl}?q=${location}&units=${unit}&lang=${language}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
