import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './components/navigation/Nav';
import "./styles/app.scss";

function App() {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [localWeatherData, setLocalWeatherData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [inputData, setInputData] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');
  const [unit, setUnit] = useState('metric');

  const availableLanguages = [{name:'English', code:'en'}, {name:'Italian', code:'it'}, {name:'French', code:'fr'}, {name:'Romanian', code:'ro'}, {name:'Spanish', code:'sp'}];

  // EVENTS
  const inputDataFunction = (e) => {
    setInputData(e.target.value);
  }
  const applyLocation = () => {
    setLocation(inputData);
  }
  const applyLanguage = e => {
    setLanguage(e.target.value);
  }
  const applyUnit = e => {
    setUnit(e.target.value);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(location => {
      setCurrentLocation(location.coords);
    })
  }, [] )
  useEffect(() => {
    if(location) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&lang=${language}&appid=ad232c5285db15075e3e2ece306f1649`).then(response => {
      setWeatherData(response.data);
    }).catch(err => console.log('ERROR', err));
    }
  }, [location, language, unit]);
  useEffect(() => {
    if(currentLocation) {
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation?.latitude}&lon=${currentLocation?.longitude}&units=${unit}&lang=${language}&appid=ad232c5285db15075e3e2ece306f1649`).then(response => {
            setLocalWeatherData(response.data);
        }).catch(err => console.log('ERROR', err));
        }
  }, [currentLocation, language, unit]);
  // useEffect(() => {
    // if(location) {
    //   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&lang=${language}&appid=ad232c5285db15075e3e2ece306f1649`).then(response => {
    //   setWeatherData(response.data);
    // }).catch(err => console.log('ERROR', err));
    // return;
    // }
  //   if(currentLocation) {
  //     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation?.latitude}&lon=${currentLocation?.longitude}&units=${unit}&lang=${language}&appid=ad232c5285db15075e3e2ece306f1649`).then(response => {
  //     setWeatherData(response.data);
  //   }).catch(err => console.log('ERROR', err));
  //   }
  // }, [currentLocation, location, language, unit]);

  return (
    (currentLocation && localWeatherData && <div>
      <Nav currentLocation={localWeatherData.name} currentTemperature={localWeatherData.main.temp}></Nav>
      {Math.floor(weatherData ? weatherData.main.temp : localWeatherData.main.temp)}C, 
      {weatherData ? weatherData.weather[0].description : localWeatherData.weather[0].description}, 
      {weatherData ? weatherData.name : localWeatherData.name}, 
      {weatherData ? weatherData.sys.country : localWeatherData.sys.country}
      <input type='text' onChange={inputDataFunction}/>
      <button onClick={applyLocation}>Get weather</button>
      <span>Language</span>
      <select onChange={applyLanguage}>
      {availableLanguages.map((language) => (
        <option value={language.code} key={language.code}>{language.name}</option>
      ))}

      </select>
      <span>Unit</span>
      <select onChange={applyUnit}>
        <option value='metric'>Metric</option>
        <option value='imperial'>Imperial</option>
        <option value='standard'>Standard</option>
      </select>
    </div>)
  );
}

export default App;
