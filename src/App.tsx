import React, { useState, useEffect } from 'react';
import ForecastItem from './components/ForecastItem';
import ErrorModal from './components/ErrorModal';
import SearchForm from './components/SearchForm';
import WeatherService from './services/WeatherService';

export type ForecastItem = {
  number: number;
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  icon: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastItem[] | null>(null);
  const [geolocationBlocked, setGeolocationBlocked] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locationTitle, setLocationTitle] = useState('');

  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setGeolocationBlocked(result.state === 'denied');
      });
    }
  }, []);

  const handleSearch = async (address: string) => {
    try {
      setLoading(true);
      const geocodeData = await WeatherService.fetchWeatherByAddress(address);

      if (geocodeData.result.addressMatches[0]) {
        const coordinates = geocodeData.result.addressMatches[0].coordinates;
        const forecastData = await WeatherService.fetchWeatherByCoordinates(coordinates);

        setForecast(forecastData);
        setLoading(false);
        setLocationTitle(address);
        setErrorModalOpen(false);
        setErrorMessage('');
      } else {
        throw new Error('Address not found. Please enter a valid address (Example: 1600 Pennsylvania Avenue NW, Washington, DC 20500 ).');
      }
    } catch (error: any) {
      setErrorModalOpen(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleUseMyLocation = async () => {
    try {
      setLoading(true);
      const forecastData = await WeatherService.fetchWeatherByLocation() as ForecastItem[];

      setForecast(forecastData);
      setLoading(false);
      setLocationTitle('Your Current Location');
      setErrorModalOpen(false);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setErrorModalOpen(false);
    setErrorMessage('');
  };

  const groupForecastByDay = (forecastData: ForecastItem[] | null): ForecastItem[][] => {
    if (!forecastData) return [];
    const groupedData: ForecastItem[][] = [];
    let currentGroup: ForecastItem[] = [];

    forecastData.forEach((item, index) => {
      if (index === 0 || item.name !== forecastData[index - 1].name) {
        if (currentGroup.length > 0) {
          groupedData.push(currentGroup);
        }
        currentGroup = [item];
      } else {
        currentGroup.push(item);
      }
    });

    if (currentGroup.length > 0) {
      groupedData.push(currentGroup);
    }

    return groupedData;
  };

  const groupedForecast = groupForecastByDay(forecast);

  return (
    <main>
        <h1>Your Weather <span>Forecast</span></h1>
        <SearchForm onSearch={handleSearch} onUseMyLocation={handleUseMyLocation} isLocationBlocked={geolocationBlocked} />
        {errorModalOpen && <ErrorModal onClose={closeModal} errorMessage={errorMessage} />}
        {locationTitle && <h2>{locationTitle}</h2>}
        {loading && <p>Loading...</p>}
  
        {groupedForecast.map((group, index) => (
          <div key={index}>
            {group.map((item) => (
              <ForecastItem key={item.number} forecastItem={item} />
            ))}
          </div>
        ))}
        </main>
  );
            };  
export default App;
