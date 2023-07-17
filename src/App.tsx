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


const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastItemType[] | null>(null);
  const [geolocationBlocked, setGeolocationBlocked] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(0);
  const [numOfDays, setNumOfDays] = useState<number>(7);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser. The 'Use My Location' feature may not work.");
    } else {
      navigator.permissions?.query({ name: 'geolocation' }).then((result) => {
        setGeolocationBlocked(result.state === 'denied');
      });
    }
  }, []);

  const handleSearch = async (address: string, numOfDays: number) => {
    try {
      setLoading(true);

      const validUSStates = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
        'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
        'WI', 'WY'
      ];

      const multipliedNumOfDays = numOfDays * 2;

      const zipCodeRegex = /\b\d{5}(?:-\d{4})?(?=\D*$)/;
      const zipCodeMatch = address.match(zipCodeRegex);
      const zipCode = zipCodeMatch ? zipCodeMatch[0] : '';

      if (zipCode) {
        const forecastData = await fetchWeatherByZIPCode(zipCode);
        const cityStateData = await fetchCityStateByZIPCode(zipCode);

        if (!validUSStates.includes(cityStateData.state)) {
          throw new Error('Invalid address. Please enter a valid address within the United States.');
        }

        setForecast(forecastData.slice(0, multipliedNumOfDays));
        setLoading(false);
        setLocationTitle(cityStateData.city ? `${cityStateData.city}, ${cityStateData.state}` : address);
        setErrorModalOpen(false);
        setErrorMessage('');
      } else {
        const errorMessage = 'Invalid address format. Please enter a valid address or ZIP code within the United States.';
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
        wind: item.windSpeed,
      }));
      setForecast(processedForecastData);
      setLoading(false);
      setLocationTitle('Your Current Location');
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
      const cityStateData = await fetchCityStateByZIPCode(zipCode);

      setForecast(forecastData);
      setLoading(false);
      setLocationTitle(`${cityStateData.city}, ${cityStateData.state}`);
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

    return groupedData.slice(0, numOfDays);
  };

  const groupedForecast = groupForecastByDay(forecast);

  const handleDayClick = (dayIndex: number) => {
    if (selectedDay === dayIndex) {
      setSelectedDay(null);
    } else {
      setSelectedDay(dayIndex);
    }
  };

  const getDayLabel = (dayIndex: number): string => {
    if (!forecast || forecast.length === 0) {
      return '';
    }

    if (dayIndex === 0) {
      return 'Today';
    } else {
      const today = new Date();
      const date = new Date(forecast[0].startTime);
      date.setDate(date.getDate() + dayIndex);
      if (date.getDate() === today.getDate()) {
        return 'Today';
      } else {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
      }
    }
  };

  const handleChangeNumOfDays = (value: number) => {
    if (value < 1 || value > 7) {
      const errorMessage = 'Invalid number of days. Please enter a number between 1 and 7.';
      setErrorModalOpen(true);
      setErrorMessage(errorMessage);
    } else {
      setNumOfDays(value);
      setErrorMessage('');
      setErrorModalOpen(false);
    }
  };

  return (
    <main>
      <h1 className="Your-Weather-Forecast-Title">
        Your Weather <span>Forecast</span>
      </h1>
      <h3>United States</h3>
      <SearchForm
        onSearchByZIPCode={handleSearchByZIPCode}
        onSearch={handleSearch}
        onUseMyLocation={handleUseMyLocation}
        isLocationBlocked={geolocationBlocked}
        onChangeNumOfDays={handleChangeNumOfDays}
        errorMessage={errorMessage}
        setErrorModalOpen={setErrorModalOpen}
      />

      {errorModalOpen && <ErrorModal errorMessage={errorMessage} onClose={closeModal} />}
      {locationTitle && <h2>{locationTitle}</h2>}
      {loading && <p>Loading...</p>}

      <div className="forecast-container">
        {groupedForecast.map((group, index) => (
          <div key={index} className="forecast-day">
            <button
              className={`day-button ${selectedDay === index ? 'active' : ''}`}
              onClick={() => handleDayClick(index)}
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
      </div>
    </main>
  );
};

export default App;
