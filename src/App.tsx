import React, { useState, useEffect } from 'react';
import ForecastItem from './components/ForecastItem';
import ErrorModal from './components/ErrorModal';
import SearchForm from './components/SearchForm';
import {
  fetchWeatherByAddress,
  fetchWeatherByCoordinates,
  fetchWeatherByLocation,
  fetchWeatherByZIPCode,
  fetchCityStateByZIPCode,
} from './services/WeatherService';
import './index.css';
import './tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export type ForecastItemType = {
  number: number;
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  icon: string;
  wind: number;
  startTime: string;
  weatherCondition: string;
  relativeHumidity: number;
  windSpeed: number;
  windDirection: string;
  detailedForecast: string;
};


const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastItemType[] | null>(null);
  const [geolocationBlocked, setGeolocationBlocked] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(0); // Set 0 as the default selected day

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser. The 'Use My Location' feature may not work.");
    } else {
      navigator.permissions?.query({ name: 'geolocation' }).then((result) => {
        setGeolocationBlocked(result.state === 'denied');
      });
    }
  }, []);

  const handleSearch = async (address: string) => {
    try {
      setLoading(true);
      const geocodeData = await fetchWeatherByAddress(address);

      if (geocodeData.result.addressMatches[0]) {
        const coordinates = geocodeData.result.addressMatches[0].coordinates;
        const forecastData = await fetchWeatherByCoordinates(coordinates);

        setForecast(forecastData);
        setLoading(false);
        setLocationTitle(address);
        setErrorModalOpen(false);
        setErrorMessage('');
      } else {
        const errorMessage = 'Address not found. Please enter a valid address. For example, you can try entering "1600 Pennsylvania Avenue NW, Washington, DC 20500" or "20500".';
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Error occurred while fetching weather data. Please try again later.';
      setErrorModalOpen(true);
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };

  const handleUseMyLocation = async () => {
    try {
      setLoading(true);
      const forecastData = (await fetchWeatherByLocation()) as ForecastItemType[];
      const processedForecastData = forecastData.map((item) => ({
        ...item,
        wind: item.windSpeed, // Set wind speed
      }));
      setForecast(processedForecastData);
      setLoading(false);
      setLocationTitle('Your Current Location'); // Update the location title
      setErrorModalOpen(false);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearchByZIPCode = async (zipCode: string) => {
    try {
      setLoading(true);
      const forecastData = await fetchWeatherByZIPCode(zipCode);
      const cityStateData = await fetchCityStateByZIPCode(zipCode); // Function to fetch city and state data

      setForecast(forecastData);
      setLoading(false);
      setLocationTitle(`${cityStateData.city}, ${cityStateData.state}`); // Update the location title with city and state
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

  const groupForecastByDay = (forecastData: ForecastItemType[] | null): ForecastItemType[][] => {
    if (!forecastData) return [];
    const groupedData: ForecastItemType[][] = [];
    let currentGroup: ForecastItemType[] = [];

    forecastData.forEach((item, index) => {
      if (index === 0 || item.startTime.slice(0, 10) !== forecastData[index - 1].startTime.slice(0, 10)) {
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

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleDayClick = (dayIndex: number) => {
    if (selectedDay === dayIndex) {
      setSelectedDay(null); // Deselect the day if it's already selected
    } else {
      setSelectedDay(dayIndex); // Select the day
    }
  };

  const getDayLabel = (dayIndex: number): string => {
    if (!forecast || forecast.length === 0) {
      return ''; // Return an empty string or handle the case when forecast is null or empty
    }

    if (dayIndex === 0) {
      return 'Today';
    } else {
      const today = new Date();
      const date = new Date(forecast[0].startTime); // Assuming the first forecast is for the current day
      date.setDate(date.getDate() + dayIndex);
      if (date.getDate() === today.getDate()) {
        return 'Today';
      } else {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
      }
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode}>
          {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
        </button>
      </div>
      <main>
        <h1>
          Your Weather <span>Forecast</span>
        </h1>
        <SearchForm
          onSearchByZIPCode={handleSearchByZIPCode}
          onSearch={handleSearch}
          onUseMyLocation={handleUseMyLocation}
          isLocationBlocked={geolocationBlocked}
        />
        {errorModalOpen && <ErrorModal onClose={closeModal} errorMessage={errorMessage} />}
        {locationTitle && <h2>{locationTitle}</h2>}
        {loading && <p>Loading...</p>}

        {groupedForecast.map((group, index) => (
          <div key={index}>
            <button
              className={`day-button ${selectedDay === index ? 'active' : ''}`}
              onClick={() => handleDayClick(index)}
              style={{ backgroundColor: selectedDay === index ? 'green' : '' }}
            >
              {getDayLabel(index)}
            </button>
            {selectedDay === index && (
              <div className="forecast-items">
                {group.map((item) => (
                  <ForecastItem key={item.number} forecastItem={item} isDarkMode={darkMode} />
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;