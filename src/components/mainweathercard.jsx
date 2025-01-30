import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit'; 
import CloudIcon from '@mui/icons-material/Cloud';
import '../styles//mainweathercard.css';

const MainWeatherCard = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <WbSunnyIcon className="temperature-icon hot" />;
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon className="temperature-icon cold" />;
    } else {
      return <CloudIcon className="temperature-icon moderate" />;
    }
  };

  return (
    <div className="weather-card">
      <div className="weather-card-header">Now</div>
      <div className="weather-info">
        {temperatureCelsius}°C
        {renderTemperatureIcon()}
      </div>
      <div className="weather-description">{weatherDescription}</div>
      <div className="weather-footer">
        <div className="date-info">
          <CalendarMonthIcon />
          {currentDate}
        </div>
        <div className="location-info">
          <LocationOnIcon />
          {cityName}, {countryName}
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
