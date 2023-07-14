import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '@googlemaps/js-api-loader';

type Props = {
  onSearch: (address: string, numOfDays: number) => void;
  onUseMyLocation: (numOfDays: number) => void;
  isLocationBlocked: boolean;
  onSearchByZIPCode: (zipCode: string, numOfDays: number) => void;
  onchangeNumOfDays: (value: number) => void;
};

const SearchForm: React.FC<Props> = ({ onSearch, onUseMyLocation, isLocationBlocked, onSearchByZIPCode, onchangeNumOfDays }) => {
  const [query, setQuery] = useState('');
  const [numOfDays, setNumOfDays] = useState<number>(7);

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
      const autocomplete = new google.maps.places.Autocomplete(autocompleteRef.current!, {
        types: ['geocode'], // Restrict to addresses only
      });

      // When the user selects an address from the dropdown, update the query state
      autocomplete.addListener('place_changed', () => {
        const selectedPlace = autocomplete.getPlace();
        if (selectedPlace && selectedPlace.formatted_address) {
          setQuery(selectedPlace.formatted_address);
        }
      });
    });
  }, []);


  // Handle the search button click
const handleSearchClick = () => {
  if (query.length === 5 && /^\d+$/.test(query)) {
    onSearchByZIPCode(query, numOfDays);
  } else {
    onSearch(query, numOfDays);
  }
};


  // Handle the "Use My Location" button click
  const handleLocationClick = () => {
    onUseMyLocation(numOfDays);
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
        <label className='num-of-days-label' htmlFor="num-of-days">Number of Days</label>
        <input
          type="number"
          value={numOfDays}
          onChange={(e) => setNumOfDays(Number(e.target.value))}
          min={1}
          max={7}
          className="num-of-days"
          placeholder="Enter number of days"
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
