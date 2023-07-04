import {
    fetchWeatherByAddress,
    fetchWeatherByCoordinates,
    fetchWeatherByLocation,
    fetchWeatherByZIPCode,
    fetchCityStateByZIPCode,
  } from '../../services/WeatherService';
    
    describe('fetchWeatherByAddress', () => {
      it('returns the correct forecast data', async () => {
        // Add test case to verify the expected output when fetching weather by address
        const address = '123 Main St, Cleveland, OH 44113';
        const forecastData = await fetchWeatherByAddress(address);
  
        // Add assertions to verify the expected output or behavior
        expect(forecastData).toBeDefined();
      });
  
    });
   
    describe('fetchWeatherByZIPCode', () => {
      it('returns the correct forecast data', async () => {
        // Add test case to verify the expected output when fetching weather by ZIP code
        const zipCode = '44113';
        const forecastData = await fetchWeatherByZIPCode(zipCode);
  
        // Add assertions to verify the expected output or behavior
        expect(forecastData).toBeDefined();
      });

    });
  
    describe('fetchCityStateByZIPCode', () => {
      it('returns the correct city and state data', async () => {
        // Add test case to verify the expected output when fetching city and state by ZIP code
        const zipCode = '44113';
        const cityStateData = await fetchCityStateByZIPCode(zipCode);
  
        // Add assertions to verify the expected output or behavior
        expect(cityStateData).toBeDefined();
      });
    });
