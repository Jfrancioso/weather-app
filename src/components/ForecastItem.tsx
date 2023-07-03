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
  const date = new Date(forecastItem.startTime).toLocaleDateString(); // Extract date from startTime

  const getWeatherImages = (shortForecast: string) => {
    const weatherImages: { [key: string]: string[] } = {
      'Sunny': ['/sunny.gif'],
      'Mostly Cloudy': ['/cloudy.gif'],
      'Rain': ['/rain.gif'],
      'Chance Showers And Thunderstorms': ['/rain-and-thunder.gif'],
      'Slight Chance Showers And Thunderstorms': ['/rain-and-thunder.gif'],
      'Scattered Showers And Thunderstorms': ['/storm.gif'],
      'Mostly Clear': ['/clear-skies-sun.gif'],
      'Slight Chance Showers And Thunderstorms then Mostly Clear': ['/rain-and-thunder.gif', '/right-arrow.gif', '/clear-skies-sun.gif'],
      'Mostly Clear then Slight Chance Rain Showers': ['/clear-skies-sun.gif', '/right-arrow.gif', '/rain.gif'],
      'Showers And Thunderstorms Likely': ['/rain-and-thunder.gif'],
      'Chance Rain Showers then Slight Chance Showers And Thunderstorms': ['/rain.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Slight Chance Rain Showers then Slight Chance Showers And Thunderstorms': ['/rain.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Slight Chance Showers And Thunderstorms then Mostly Cloudy': ['/rain-and-thunder.gif', '/right-arrow.gif', '/cloudy.gif'],
      'Mostly Sunny then Slight Chance Showers And Thunderstorms': ['/sunny.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Chance Showers And Thunderstorms then Scattered Showers And Thunderstorms': ['/rain-and-thunder.gif', '/right-arrow.gif', '/storm.gif'],
      'Partly Sunny then Chance Showers And Thunderstorms': ['/partly-sunny.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Mostly Sunny then Chance Showers And Thunderstorms': ['/sunny.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Chance Showers And Thunderstorms then Partly Cloudy': ['/rain-and-thunder.gif', '/right-arrow.gif', '/partly-sunny.gif'],
      'Slight Chance Rain Showers then Chance Showers And Thunderstorms': ['/rain.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Chance Rain Showers then Chance Showers And Thunderstorms': ['/rain.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Chance Showers And Thunderstorms then Showers And Thunderstorms': ['/rain-and-thunder.gif', '/right-arrow.gif', '/storm.gif'],
      'Mostly Sunny': ['/sunny.gif'],
      'Partly Cloudy': ['/partly-sunny.gif'],
      'Chance Rain Showers': ['/rain.gif'],
      'Chance Rain Showers then Mostly Cloudy': ['/rain.gif', '/right-arrow.gif', '/cloudy.gif'],
      'Sunny then Slight Chance Rain Showers': ['/sunny.gif', '/right-arrow.gif', '/rain.gif'],
      'Slight Chance Rain Showers then Mostly Clear': ['/rain.gif', '/right-arrow.gif', '/clear-skies-sun.gif'],
      'Slight Chance Showers And Thunderstorms then Partly Cloudy': ['/rain-and-thunder.gif', '/right-arrow.gif', '/partly-sunny.gif'],
      'Slight Chance Rain Showers': ['/rain.gif'],
      'Partly Sunny': ['/partly-sunny.gif'],
      'Sunny then Slight Chance Showers And Thunderstorms': ['/sunny.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Showers And Thunderstorms Likely then Patchy Fog': ['/rain-and-thunder.gif', '/right-arrow.gif', '/foggy.gif'],
      'Patchy Fog then Showers And Thunderstorms Likely': ['/foggy.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Chance Showers And Thunderstorms then Patchy Fog': ['/rain-and-thunder.gif', '/right-arrow.gif', '/foggy.gif'],
      'Chance Showers And Thunderstorms then Mostly Clear': ['/rain-and-thunder.gif', '/right-arrow.gif', '/clear-skies-sun.gif'],
      'Chance Showers And Thunderstorms then Mostly Cloudy': ['/rain-and-thunder.gif', '/right-arrow.gif', '/cloudy.gif'],
      'Showers And Thunderstorms': ['/rain-and-thunder.gif', '/right-arrow.gif', '/cloudy.gif'],
      'Mostly Sunny then Slight Chance Rain Showers': ['/sunny.gif', '/right-arrow.gif', '/rain.gif'],
      'Clear': ['/clear-skies-sun.gif'],
      'Patchy Fog': ['/foggy.gif'],
      'Patchy Fog then Mostly Sunny': ['/foggy.gif', '/right-arrow.gif', '/sunny.gif'],
      
      
      // Add more mappings as needed based on your weather images in the public folder
    };

    const imageSrcs = weatherImages[shortForecast];
    if (imageSrcs) {
      return (
        <div className="weather-images-container">
          {imageSrcs.map((src) => (
            <img key={src} src={process.env.PUBLIC_URL + src} alt={shortForecast} className="weather-image" />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="forecast-item">
      <div className="forecast-item-inner" key={forecastItem.number}>
        <h3 className="forecast-item-title">
          {date} - {forecastItem.name}
        </h3>
        <p className="forecast-item-temperature">
          <span className="temperature-circle">{forecastItem.temperature}</span> {forecastItem.temperatureUnit}
        </p>
        <p className="forecast-item-forecast">{forecastItem.shortForecast}</p>
        {getWeatherImages(forecastItem.shortForecast)}
      </div>
    </div>
  );
};

export default ForecastItem;
