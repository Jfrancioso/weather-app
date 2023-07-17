import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '@googlemaps/js-api-loader';

type Props = {
  onSearch: (address: string, numOfDays: number) => void;
  onUseMyLocation: (numOfDays: number) => void;
  isLocationBlocked: boolean;
  onSearchByZIPCode: (zipCode: string, numOfDays: number) => void;
  onChangeNumOfDays: (value: number) => void;
  errorMessage: string;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchForm: React.FC<Props> = ({
  onSearch,
  onUseMyLocation,
  isLocationBlocked,
  onSearchByZIPCode,
  onChangeNumOfDays,
  errorMessage,
  setErrorModalOpen,
}) => {
  const [query, setQuery] = useState('');
  const [numOfDays, setNumOfDays] = useState<number | undefined>(undefined);
  const [error, setError] = useState(errorMessage);

  const autocompleteRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Load the Google Maps API
    const loader = new Loader({
      apiKey: process.env.REACT_APP_API_KEY || '',
      version: 'weekly',
      libraries: ['places'],
    });

    // Initialize the Google Maps autocomplete
    loader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(autocompleteRef.current!);

      // When the user selects an address from the dropdown, update the query state
      autocomplete.addListener('place_changed', () => {
        const selectedPlace = autocomplete.getPlace();
        if (selectedPlace && selectedPlace.formatted_address) {
          setQuery(selectedPlace.formatted_address);
        }
      });
    });
  }, []);

  const handleSearchClick = () => {
    if (query.length === 5 && /^\d+$/.test(query)) {
      onSearchByZIPCode(query, numOfDays || 7);
    } else {
      onSearch(query, numOfDays || 7);
    }
  };

  const handleLocationClick = () => {
    onUseMyLocation(numOfDays || 7);
  };

  const handleChangeNumOfDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const symbolRegex = /[^0-9]/g; // Regular expression to match any non-digit character
  
    if (value === '') {
      setNumOfDays(undefined);
      setError('');
    } else if (symbolRegex.test(value)) {
      setError('Invalid input. Please enter a number between 1 and 7.');
    } else {
      const parsedValue = Number(value);
      if (parsedValue < 1 || parsedValue > 7) {
        setError('Please enter a number between 1 and 7 for the number of days forecast.');
      } else {
        setNumOfDays(parsedValue);
        setError('');
      }
    }
  };
  

  return (
    <div>
      <div className="search-container">
        <input
          ref={autocompleteRef}
          className="search-bar"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your address or ZIP code"
        />
        <label className="num-of-days-label" htmlFor="num-of-days">
          Number of Days (1-7)
        </label>
        <input
          type="number"
          value={numOfDays !== undefined ? numOfDays.toString() : ''}
          onChange={handleChangeNumOfDays}
          min={1}
          max={7}
          className="num-of-days"
          placeholder="0"
        />

        <div className="button-container">
          <button className="search-click" onClick={handleSearchClick}>
            Get Forecast
          </button>
          <button className="location-button" onClick={handleLocationClick} disabled={isLocationBlocked}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </button>
        </div>
        {isLocationBlocked && (
          <p>
            Geolocation permission has been blocked. Please enable it in your browser settings to use the "Use My
            Location" feature.
          </p>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="github-link">
        <a href="https://github.com/Jfrancioso" target="_blank" rel="noopener noreferrer">
          <img src="/github-sign.png" alt="GitHub Icon" className="github-icon" />
        </a>
      </div>
    </div>
  );
};

export default SearchForm;
