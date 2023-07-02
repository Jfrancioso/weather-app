import React from 'react';

type Props = {
  forecastItem: {
    number: number;
    name: string;
    temperature: number;
    temperatureUnit: string;
    shortForecast: string;
    icon: string;
  };
};

const ForecastItem: React.FC<Props> = ({ forecastItem }) => (
  <div className="flex flex-wrap">
    <div key={forecastItem.number} className="flex flex-col items-center mb-4 mr-4 bg-white rounded-lg p-4 shadow">
      <h3 className="text-xl font-bold mb-2">{forecastItem.name}</h3>
      <p className="text-lg mb-2">{forecastItem.temperature} {forecastItem.temperatureUnit}</p>
      <p>{forecastItem.shortForecast}</p>
      <img src={forecastItem.icon} alt={forecastItem.shortForecast} className="mt-2" />
      <p>
        Observations:
      </p>
    </div>
  </div>
);

export default ForecastItem;
