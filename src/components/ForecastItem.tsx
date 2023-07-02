import React from 'react';

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
  const date = new Date(forecastItem.startTime).toLocaleDateString();

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
        <img src={`${process.env.PUBLIC_URL}/icons/${forecastItem.icon}.png`} alt={forecastItem.shortForecast} className="forecast-item-icon" />
      </div>
    </div>
  );
};

export default ForecastItem;
