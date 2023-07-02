import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faBolt, faSnowflake } from '@fortawesome/free-solid-svg-icons';

type Props = {
  forecastItem: {
    number: number;
    name: string;
    startTime: string;
    temperature: number;
    temperatureUnit: string;
    shortForecast: string;
    icon: string;
    weatherCondition: string;
  };
};

const ForecastItem: React.FC<Props> = ({ forecastItem }) => {
  const date = new Date(forecastItem.startTime).toLocaleDateString(); // Extract date from startTime
  // Map weather conditions to corresponding FontAwesome icons
  const weatherIcons: { [key: string]: any } = {
    Clear: faSun,
    Clouds: faCloud,
    Rain: faCloudRain,
    Thunderstorm: faBolt,
    Snow: faSnowflake,
  };

  return (
    <div className="forecast-item">
      <div className="forecast-item-inner" key={forecastItem.number}>
        <h3 className="forecast-item-title">
          {date} - {forecastItem.name}
        </h3>
        <p className="forecast-item-temperature">
          {forecastItem.temperature} {forecastItem.temperatureUnit}
        </p>
        <p className="forecast-item-forecast">{forecastItem.shortForecast}</p>
        <img src={forecastItem.icon} alt={forecastItem.shortForecast} className="forecast-item-icon" />
        <FontAwesomeIcon icon={weatherIcons[forecastItem.weatherCondition as keyof typeof weatherIcons]} className="mt-2" />
        <p className="forecast-item-observations">Observations:</p>
      </div>
    </div>
  );
};

export default ForecastItem;
