import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "../../src/components/Highlightbox";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import '../styles/todayhighlights.css';

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, wind, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Mid";
      case 4:
        return "Poor";
      case 5:
        return "Bad";
      default:
        return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      Icon: CompressIcon,
    },
    {
      title: "Visibility",
      value: `${visibility / 1000} km`,
      Icon: VisibilityIcon,
    },
    {
      title: "Feels Like",
      value: `${main.feels_like}°C`,
      Icon: DeviceThermostatIcon,
    },
  ];

  return (
    <div className="today-highlights">
      <div className="today-highlights__title">Today's Highlights</div>
      <div className="today-highlights__container">
        <div className="today-highlights__box" style={{ width: "390px" }}>
          <div className="today-highlights__box__header">
            <p>Air Quality Index</p>
            <div className="air-quality-description">
              {renderAirQualityDescription(airQualityIndex)}
            </div>
          </div>
          <div>
            <AirIcon className="icon-size" />
            <div className="today-highlights__box__air-quality">
              <div>
                <p style={{ fontWeight: "bold" }}>CO</p>
                <p>{co} µg/m³</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>NO</p>
                <p>{no} µg/m³</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>NO₂</p>
                <p>{no2} µg/m³</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>O₃</p>
                <p>{o3} µg/m³</p>
              </div>
            </div>
          </div>
        </div>

        <div className="today-highlights__box" style={{ width: "400px" }}>
          <div className="today-highlights__box__sunrise-sunset">
            <p style={{ fontSize: "22px", textAlign: "center" }}>Sunrise and Sunset</p>
            <div className="today-highlights__box__sun">
              <div className="sun-time">
                <WbSunnyIcon className="icon-size" />
                <p className="time-text">{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
              </div>
              <div className="sun-time">
                <NightsStayIcon className="icon-size" />
                <p className="time-text">{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="today-highlights__highlight-container">
        {highlights.map((highlight, index) => (
          <HighlightBox
            key={index}
            title={highlight.title}
            value={highlight.value}
            Icon={highlight.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;
