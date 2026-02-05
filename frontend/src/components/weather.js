import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const API = "http://localhost:5000/api/weather";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(`${API}/${city}`);
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
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
        <button onClick={fetchWeather}>Search</button>
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