import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '@googlemaps/js-api-loader';

type Props = {
  onSearch: (address: string) => void;
  onUseMyLocation: () => void;
  isLocationBlocked: boolean;
  onSearchByZIPCode: (zipCode: string) => void;
};

const SearchForm: React.FC<Props> = ({ onSearch, onUseMyLocation, isLocationBlocked, onSearchByZIPCode }) => {
  const [query, setQuery] = useState('');
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
      onSearchByZIPCode(query);
    } else {
      onSearch(query);
    }
  };

  // Handle the "Use My Location" button click
  const handleLocationClick = () => {
    onUseMyLocation();
  };

  return (
    <div className="search-container">
      <input
        ref={autocompleteRef}
        className="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your address or ZIP code"
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
        <p>Geolocation permission has been blocked. Please enable it in your browser settings to use the "Use My Location" feature.</p>
      )}
    </div>
  );
}
export default SearchForm;