import React, { useState } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";
const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [view, setView] = useState(true);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b691c6abb5719ff6339e831d1b1b68ec`;

  const searchLocation = (event) => {
    setView(false);
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {view && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>Bangalore</p>
            </div>
            <div className="temp">
              <h1>78°F</h1>
            </div>
            <div className="description">
              <p>Cloudy</p>
            </div>
          </div>
          <div className="location">
            <p>Seems Cloudy...</p>
          </div>
          <Paper variant="outlined" />
          <div className="bottom">
            <div className="feels">
              <p className="bold">65°F</p>

              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">45%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">40 MPH</p>

              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed() / 10}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="location">
          {data.weather ? <p>{data.weather[0].description}</p> : null}
        </div>
        <Paper variant="outlined" />

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed() / 10}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
