import { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ handleInputChange }) => {
  return (
    <>
      Find countries: <input type="text" onChange={handleInputChange} />
    </>
  );
};

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <p>Loading weather...</p>
    );
  } else {
    return (
      <>
        <p>temperature {weatherData.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather" />
        <p>wind {weatherData.wind.speed} m/s</p>
      </>
    );
  }
};

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const [lat, lng] = country.latlng;
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => setWeather(response.data));
  }, [country]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <h2>Weather in {country.name.common}</h2>
      <Weather weatherData={weather} />
    </>
  );
};

const Countries = ({ countries, handleClickButtom }) => {
  if (countries.length > 10) {
    return (
      <p>To many matches, specify another filter</p>
    );
  } else if (countries.length === 1) {
    return (
      <SingleCountry country={countries[0]} />
    );
  } else {
    return (
      <>
        {countries.map((country) => <p key={country.name.common}> {country.name.common} <button onClick={() => handleClickButtom(country.name.common)}>Show</button></p>)}
      </>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  }, []);

  const handleClickButtom = (country) => {
    setSearch(country);
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const filter = !search ? countries : countries.filter((country) => country.name.common.toLowerCase().startsWith(search.toLowerCase()));

  return (
    <div>
      <Search handleInputChange={handleInputChange} />
      <Countries countries={filter} handleClickButtom={handleClickButtom} />
    </div>
  );
};

export default App;
