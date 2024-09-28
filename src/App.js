import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = '66df2e5136f3f8890304ac29575e68c3'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            <h1>{data.main ? `${data.main.temp.toFixed()}°C` : 'null'}</h1>
          </div>
          <div className='description'>
            <p>{data.weather ? data.weather[0].description : 'null'}</p>
          </div>
        </div>

        {data.name !== undefined &&
        <div className='bottom'>
        <div className='feels'>
          <p className='bold'>{data.main ? `${data.main.feels_like}°C` : ''}</p>
          <p>Feels like</p>
        </div>
        <div className='humidity'>
          <p className='bold'>{data.main ? `${data.main.humidity}%` : ''}</p>
          <p>Humidity</p>
        </div>
        <div className='wind'>
          <p className='bold'>{data.wind ? `${data.wind.speed} km/h` : ''}</p>
          <p>Wind Speed</p>
        </div>
      </div>
      }
        
      </div>
    </div>
  );
}

export default App;

