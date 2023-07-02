import React, { useState } from 'react';
import Header from './Header';

type Props = {
  onSearch: (query: string) => void;
  onUseMyLocation: () => void;
  isLocationBlocked: boolean;
  onSearchByZIPCode: (zipCode: string) => void;
};

const SearchForm: React.FC<Props> = ({ onSearch, onUseMyLocation, isLocationBlocked, onSearchByZIPCode }) => {
  const [query, setQuery] = useState('');

  const handleSearchClick = () => {
    if (query.length === 5 && /^\d+$/.test(query)) {
      onSearchByZIPCode(query);
    } else {
      onSearch(query);
    }
  };

  const handleLocationClick = () => {
    onUseMyLocation();
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your address or ZIP code"
      />
      <button onClick={handleSearchClick}>Get Forecast</button>

      <button
        onClick={handleLocationClick}
        disabled={isLocationBlocked}
        className="p-2 bg-blue-500 text-white rounded location-button"
        id="use-location-button"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        Use My Location
      </button>
      {isLocationBlocked && (
        <p>Geolocation permission has been blocked. Please enable it in your browser settings to use the "Use My Location" feature.</p>
      )}
    </div>
  );
};

export default SearchForm;
