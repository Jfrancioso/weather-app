import React, { useState } from 'react';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onSearch: (query: string) => void;
  onUseMyLocation: () => void;
  isLocationBlocked: boolean;
  onSearchByZIPCode: (zipCode: string) => void;
};

const SearchForm: React.FC<Props> = ({
  onSearch,
  onUseMyLocation,
  isLocationBlocked,
  onSearchByZIPCode,
}) => {
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
        className="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your address or ZIP code"
      />
      <button className="search-click" onClick={handleSearchClick}>
        Get Forecast
      </button>

      <button className="location-button" onClick={handleLocationClick} disabled={isLocationBlocked}>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </button>

      {isLocationBlocked && (
        <p>Geolocation permission has been blocked. Please enable it in your browser settings to use the "Use My Location" feature.</p>
      )}
    </div>
  );
};

export default SearchForm;
