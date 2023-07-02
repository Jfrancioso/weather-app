import React, { useState } from 'react';
import Header from './Header'

type Props = {
  onSearch: (address: string) => void;
  onUseMyLocation: () => void;
  isLocationBlocked: boolean;
};

const SearchForm: React.FC<Props> = ({ onSearch, onUseMyLocation, isLocationBlocked }) => {
  const [address, setAddress] = useState('');

  

  const handleSearchClick = () => {
    onSearch(address);
  };

  const handleLocationClick = () => {
    onUseMyLocation();
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
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