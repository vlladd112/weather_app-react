import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './components/navigation/Nav';
import "./styles/app.scss";
import {currentLocationCoords, getLocalWeatherUrl, getWeatherUrl} from "./api";

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

  const handleKeyDown = e => {
    if(e.key === 'Enter') {
      applyLocation();
    }
  }

  useEffect(() => {
    currentLocationCoords(setCurrentLocation);
  }, [] );

  useEffect(() => {
    if(currentLocation) {
          axios.get(getLocalWeatherUrl(currentLocation, language, unit)).then(response => {
            setLocalWeatherData(response.data);
        }).catch(err => console.log('ERROR', err));
        }
  }, [currentLocation, language, unit]);

  useEffect(() => {
    if(location) {
      axios.get(getWeatherUrl(location, language, unit)).then(response => {
      setWeatherData(response.data);
    }).catch(err => console.log('ERROR', err));
    }
  }, [location, language, unit]);

  return (
    (currentLocation && localWeatherData && <div>
      <Nav currentLocation={localWeatherData.name} currentTemperature={localWeatherData.main.temp}></Nav>
      {Math.floor(weatherData ? weatherData.main.temp : localWeatherData.main.temp)}C, 
      {weatherData ? weatherData.weather[0].description : localWeatherData.weather[0].description}, 
      {weatherData ? weatherData.name : localWeatherData.name}, 
      {weatherData ? weatherData.sys.country : localWeatherData.sys.country}
      <input type='text' onChange={inputDataFunction} onKeyDown={handleKeyDown}/>
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
