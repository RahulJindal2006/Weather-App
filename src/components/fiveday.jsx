import React from "react";

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
    <div
      style={{
        background: "linear-gradient(to bottom right, #4B5563, #1F2937)",
        color: "white",
        borderRadius: "0.75rem",
        width: "320px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Subtle shadow effect
        transition: "box-shadow 0.3s ease-in-out",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.5)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>5-Day Forecast</h3>
      {uniqueForecasts.slice(0, 5).map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #6B7280",
            paddingBottom: "10px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: "bold", flex: 1 }}>
            {formatDate(item.dt_txt)}
          </div>
          <div style={{ fontSize: "14px", textAlign: "center", flex: 2 }}>
            {item.weather[0].description}
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              flex: 1,
              textAlign: "right",
            }}
          >
            {Math.round(item.main.temp)}°C
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
