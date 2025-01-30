import React from "react";
import '../styles/fiveday.css';

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  // Filter to get one forecast entry per day
  const uniqueForecasts = forecastData.list.reduce((acc, curr) => {
    const date = formatDate(curr.dt_txt);
    if (!acc.find((item) => formatDate(item.dt_txt) === date)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      {uniqueForecasts.slice(0, 5).map((item, index) => (
        <div key={index} className="forecast-item">
          <div className="forecast-date">{formatDate(item.dt_txt)}</div>
          <div className="forecast-description">{item.weather[0].description}</div>
          <div className="forecast-temp">{Math.round(item.main.temp)}°C</div>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
