import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";
import backgroundImage from './assets/sunset.jpeg'; // Adjust path if necessary
import './app.css'; // Or './App.css' based on your file structure

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = '864f20b6dd8a7223ba7af6a1161be480';
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => setAirQualityData(response.data.list[0]))
      .catch(error => console.error('Error fetching the air quality data:', error));
  };

  const fetchWeatherData = (city) => {
    const API_KEY = '864f20b6dd8a7223ba7af6a1161be480';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
          .then(response => setFiveDayForecast(response.data))
          .catch(error => console.error('Error fetching the 5-day forecast data:', error));
      })
      .catch(error => console.error('Error fetching the weather data:', error));
  };

  const fetchWeatherDataByLocation = (latitude, longitude) => {
    const API_KEY = '864f20b6dd8a7223ba7af6a1161be480';
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
          .then(response => setFiveDayForecast(response.data))
          .catch(error => console.error('Error fetching the 5-day forecast data:', error));
      })
      .catch(error => console.error('Error fetching the weather data by location:', error));
  };

  const handleSearch = (searchedCity) => setCity(searchedCity);

  const handleLocationSearch = (latitude, longitude) => {
    fetchWeatherDataByLocation(latitude, longitude);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Covers the viewport height
        minWidth: "100vw", // Covers the viewport width
        height: "100%", // Ensures it takes full parent height
        width: "100%", // Ensures it spans the parent width
        display: "flex", // Ensures proper layout for child elements
        flexDirection: "column",
        margin: "0", // Removes potential margin issues
        padding: "0", // Removes potential padding issues
      }}
    >
      <Navbar onSearch={handleSearch} onLocationSearch={handleLocationSearch} />
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <MainWeatherCard weatherData={weatherData} />
            <p style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>5 Days Forecast</p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "20px" }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
