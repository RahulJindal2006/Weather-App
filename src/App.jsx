import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";
import './styles/app.css';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationQuery, setLocationQuery] = useState('Miami');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const API_KEY = '864f20b6dd8a7223ba7af6a1161be480'; // OpenWeather API Key

  const fetchWeatherData = async (query, startDate, endDate) => {
    try {
      let coordinates;

      let formattedQuery = query;
      if (query.includes(",")) {
        const [city, country] = query.split(",").map(part => part.trim());
        formattedQuery = `${city}, ${country}`; 
      }

      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formattedQuery)}`
      );

      if (geoResponse.data.length === 0) {
        alert("Invalid location. Please try again.");
        return;
      }

      const { lat, lon } = geoResponse.data[0];
      coordinates = { lat, lon };

      let weatherResponse;
      if (coordinates) {
        weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`
        );
      }

      const weatherData = weatherResponse.data;

      if (weatherData.cod !== 200) {
        alert("Invalid location. Please try again.");
        return;
      }

      setWeatherData(weatherData);

      // Fetch air quality data
      const airQualityResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`
      );
      setAirQualityData(airQualityResponse.data.list[0]);

      // Fetch 5-day weather forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=metric&appid=${API_KEY}`
      );
      setFiveDayForecast(forecastResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data, please try again later.");
    }
  };

  const handleSubmit = async () => {
    try {
      if (!startDate || !endDate) {
        setErrorMessage('Please enter both start and end dates.');
        return;
      }

      else if (startDate > endDate) {
        setErrorMessage('Please make sure your start date is smaller than your end date')
        return;
      }

      const response = await axios.post('http://localhost:4000/weather', {
        location: locationQuery,
        startDate,
        endDate,
        temperatureData: weatherData?.main?.temp, // Send current temperature data
      });

      if (response.status === 201) {
        setErrorMessage('');
        alert('Weather data saved successfully!');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setErrorMessage('Error saving weather data.');
    }
  };

  const handleUpdate = async () => {
    try {
      const newTemperature = prompt('Enter new temperature: ', weatherData?.main?.temp);
      if (!newTemperature) return;

      const response = await axios.put('http://localhost:4000/weather', {
        location: locationQuery,
        startDate,
        endDate,
        temperatureData: newTemperature,
      });

      if (response.status === 200) {
        alert('Weather data updated successfully!');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      setErrorMessage('Error updating weather data.');
    }
  };

  const handleDelete = async () => {
    try {
      const confirmation = window.confirm('Are you sure you want to delete this weather record?');
      if (!confirmation) return;

      const response = await axios.delete('http://localhost:4000/weather', {
        data: {
          location: locationQuery,
          startDate,
          endDate,
        }
      });

      if (response.status === 200) {
        alert('Weather data deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setErrorMessage('Error deleting weather data.');
    }
  };

  useEffect(() => {
    fetchWeatherData(locationQuery, startDate, endDate);
  }, [locationQuery]);

  return (
    <div className="dashboard-container">
      <Navbar onSearch={(query) => setLocationQuery(query)} />
      <div className="date-range">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleSubmit}>Save Weather Data</button>
        <button onClick={handleUpdate}>Update Weather Data</button>
        <button onClick={handleDelete}>Delete Weather Data</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <MainWeatherCard weatherData={weatherData} />
            <p className="forecast-header">ADDITIONAL INFORMATION</p>
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
