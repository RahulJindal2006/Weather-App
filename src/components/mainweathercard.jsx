import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Hot weather icon
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Cold weather icon
import CloudIcon from '@mui/icons-material/Cloud'; // Moderate weather icon

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
      return <WbSunnyIcon style={{ marginLeft: '10px', fontSize: '4rem', color: 'orange' }} />;
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon style={{ marginLeft: '10px', fontSize: '4rem', color: 'blue' }} />;
    } else {
      return <CloudIcon style={{ marginLeft: '10px', fontSize: '4rem', color: 'gray' }} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#4B5563',
        color: 'white',
        borderRadius: '1rem',
        width: '300px', // Increased width
        padding: '2rem', // Increased padding
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)', // Added shadow for a floating effect
      }}
    >
      <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Now</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '45px', // Increased font size for temperature
          fontWeight: 'bold',
          marginTop: '1rem',
        }}
      >
        {temperatureCelsius}°C
        {renderTemperatureIcon()}
      </div>
      <div
        style={{
          fontSize: '18px',
          marginTop: '1rem',
          fontWeight: '500',
          color: '#2D3748', // Darker color for the weather description text
          backgroundColor: '#38B2AC', // Greenish background color
          padding: '0.5rem', // Added padding for better spacing
          borderRadius: '0.5rem',
          wordWrap: 'break-word', // Ensures text doesn't overflow
          whiteSpace: 'normal', // Ensures text wraps correctly
          textAlign: 'center',
        }}
      >
        {weatherDescription}
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '8px' }}>
          <CalendarMonthIcon style={{ marginRight: '10px' }} />
          {currentDate}
        </div>
        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            color: '#D1D5DB',
          }}
        >
          <LocationOnIcon style={{ marginRight: '10px' }} />
          {cityName}, {countryName}
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
