import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather, clearWeather } from "../redux/slices/weatherSlice";
import "./Weather.css";

function Weather() {
  const dispatch = useDispatch();
  const { data: weather, loading, error } = useSelector((state) => state.weather);
  
  const [city, setCity] = useState("");

  const handleFetchWeather = () => {
    if (!city.trim()) return;
    dispatch(fetchWeather(city));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleFetchWeather();
  };

  return (
    <div className="weather-container">
      <h2>🌤️ Weather Check</h2>
      
      <div className="weather-input">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city name..."
        />
        <button onClick={handleFetchWeather}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      
      {error && <p className="error">{error}</p>}
      
      {weather && (
        <div className="weather-card">
          <h3>{weather.city}, {weather.country}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
          <p className="temp">{Math.round(weather.temperature)}°C</p>
          <p className="description">{weather.description}</p>
          <div className="details">
            <div>
              <span>Feels like</span>
              <strong>{Math.round(weather.feelsLike)}°C</strong>
            </div>
            <div>
              <span>Humidity</span>
              <strong>{weather.humidity}%</strong>
            </div>
            <div>
              <span>Wind</span>
              <strong>{weather.windSpeed} m/s</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;