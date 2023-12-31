import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';

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
    windSpeed: number;
    windDirection: string;
    relativeHumidity: number;
    detailedForecast: string;
  };
  locationTitle: string;
};

const ForecastItem: React.FC<Props> = ({ forecastItem, locationTitle}) => {
  const date = new Date(forecastItem.startTime).toLocaleDateString();
  const today = new Date().toLocaleDateString(); // Get the current date as a string

  const [showDetailedForecast, setShowDetailedForecast] = useState(false);

    /// This function will return the weather images based on the shortForecast
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
      'Showers And Thunderstorms Likely then Chance Showers And Thunderstorms': ['/rain-and-thunder.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Partly Cloudy then Slight Chance Rain Showers': ['/partly-sunny.gif', '/right-arrow.gif', '/rain.gif'],    
      'Areas Of Fog': ['/foggy.gif'],
      'Mostly Clear then Slight Chance Showers And Thunderstorms': ['/clear-skies-sun.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Mostly Cloudy then Slight Chance Showers And Thunderstorms': ['/cloudy.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Slight Chance Showers And Thunderstorms then Chance Showers And Thunderstorms': ['/rain-and-thunder.gif', '/right-arrow.gif', '/rain-and-thunder.gif'],
      'Showers And Thunderstorms Likely then Partly Sunny': ['/rain-and-thunder.gif', '/right-arrow.gif', '/partly-sunny.gif'],
      'Patchy Fog then Sunny': ['/foggy.gif', '/right-arrow.gif', '/sunny.gif'],
      'Mostly Clear then Patchy Fog': ['/clear-skies-sun.gif', '/right-arrow.gif', '/foggy.gif'],      
      //not all weather shortforecast possibilities accounted for yet
    };
 // If the shortForecast is in the weatherImages object, return the images
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

const toggleDetailedForecast = () => {
  setShowDetailedForecast((prevShowDetailedForecast) => !prevShowDetailedForecast);
};


// This function checks if it is today's forecast and returns the current time
const getCurrentTime = () => {
 if (date === today && forecastItem.name !== 'Tonight') {
   const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   return <p className="current-time">Current Time: {currentTime}</p>;
 }
 return null;
};

// This function checks if it is tonight's forecast and returns the start time
const getStartTimeTonight = () => {
 if (date === today && forecastItem.name === 'Tonight') {
   const startTime = new Date(forecastItem.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   return <p className="current-time">Start Time: {startTime}</p>;
 }
 return null;
};

const getStartTimeForFollowingDays = () => {
  if (date !== today) {
    const startTime = new Date(forecastItem.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return <p className="current-time">Start Time: {startTime}</p>;
  }
  return null;
  };


   // This function renders the forecast item component
   return (
    <div className="forecast-item">
      <div className="location-title">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <h1>{locationTitle}</h1>
      </div>
      <div
        className={`forecast-item-inner ${showDetailedForecast ? 'show-details' : ''}`}
        key={forecastItem.number}
      >
        <h3 className="forecast-item-title">
          {date} - {forecastItem.name}
        </h3>
        {getCurrentTime()} {/* Display the current time if it is today's forecast */}
        {getStartTimeTonight()} {/* Display the start time if it is tonight's forecast */}
        {getStartTimeForFollowingDays()}
        {getWeatherImages(forecastItem.shortForecast)}
        <p className="forecast-item-temperature">
          <span className="temperature-circle">{forecastItem.temperature}</span>{' '}
          {forecastItem.temperatureUnit}
        </p>
        <p className="forecast-item-forecast">{forecastItem.shortForecast}</p>
        {showDetailedForecast && (
          <p className="forecast-item-detailed-forecast">{forecastItem.detailedForecast}</p>
        )}
        <div className="forecast-item-wind">
          <FontAwesomeIcon icon={faWind} />
          <p className="forecast-item-wind-speed">Wind Speed: {forecastItem.windSpeed}</p>
        </div>
        <p className="forecast-item-wind-direction">
          Wind Direction: {forecastItem.windDirection}
        </p>
        <button onClick={toggleDetailedForecast}>
          {showDetailedForecast ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    </div>
  );
};

export default ForecastItem;