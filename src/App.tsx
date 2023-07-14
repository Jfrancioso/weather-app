import React, { useState, useEffect } from 'react';
import ForecastItem from './components/ForecastItem';
import ErrorModal from './components/ErrorModal';
import SearchForm from './components/SearchForm';
import {
  fetchWeatherByLocation,
  fetchWeatherByZIPCode,
  fetchCityStateByZIPCode,
} from './services/WeatherService';
import './index.css';

// Type definition for the forecast item
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
  locationTitle: string;
};

// State variables for the app
const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastItemType[] | null>(null);
  const [geolocationBlocked, setGeolocationBlocked] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(0); // Set 0 as the default selected day
  const [numOfDays, setNumOfDays] = useState<number>(7); // Default to 7 days

  // useEffect hook to check if geolocation is supported by the browser
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser. The 'Use My Location' feature may not work.");
    } else {
      // Query the permission status
      navigator.permissions?.query({ name: 'geolocation' }).then((result) => {
        setGeolocationBlocked(result.state === 'denied');
      });
    }
  }, []);

  const handleSearch = async (address: string, numOfDays: number) => {
    try {
      setLoading(true);

      //multiply the numOfDays by 2
      const multipliedNumOfDays = numOfDays * 2;
  
      // Extract ZIP code from the address
      const zipCodeRegex = /\b\d{5}(?:-\d{4})?(?=\D*$)/;
      const zipCodeMatch = address.match(zipCodeRegex);
      const zipCode = zipCodeMatch ? zipCodeMatch[0] : '';
  
      if (zipCode) {
        // Perform weather search using the extracted ZIP code
        const forecastData = await fetchWeatherByZIPCode(zipCode);
        const cityStateData = await fetchCityStateByZIPCode(zipCode);
  
        setForecast(forecastData.slice(0, multipliedNumOfDays));
        setLoading(false);
        setLocationTitle(`${cityStateData.city}, ${cityStateData.state}`);
        setErrorModalOpen(false);
        setErrorMessage('');
      } else {
        const errorMessage = 'Invalid address format. Please enter a valid address or ZIP code.';
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Error occurred while fetching weather data. Please try again later.';
      setErrorModalOpen(true);
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };
  

  // handleUseMyLocation for weather search by location
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

  // handleSearchByZIPCode for weather search by zip code
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

  // closeModal for closing the error modal
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

    // Return only the selected number of days
    return groupedData.slice(0, numOfDays);
  };

  // groupedForecast for grouping the forecast
  const groupedForecast = groupForecastByDay(forecast);

  // handleDayClick for handling the day click
  const handleDayClick = (dayIndex: number) => {
    if (selectedDay === dayIndex) {
      setSelectedDay(null); // Deselect the day if it's already selected
    } else {
      setSelectedDay(dayIndex); // Select the day
    }
  };

  // function to get the label for a day
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

  // handleChangeNumOfDays for handling the number of days input change
  const handleChangeNumOfDays = (value: number) => {
    setNumOfDays(value);
  };

  // Return for the app
  return (
    <main>
      <h1>
        Your Weather <span>Forecast</span>
      </h1>
      <SearchForm
  onSearchByZIPCode={handleSearchByZIPCode}
  onSearch={handleSearch}
  onUseMyLocation={handleUseMyLocation}
  isLocationBlocked={geolocationBlocked}
  onchangeNumOfDays={handleChangeNumOfDays}
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
                <ForecastItem key={item.number} forecastItem={item} locationTitle={locationTitle} />
              ))}
            </div>
          )}
        </div>
      ))}
    </main>
  );
};

export default App;
