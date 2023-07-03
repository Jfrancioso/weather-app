const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const GOOGLE_API_KEY = "AIzaSyAE-rDctKIbGthA7t9GDdbplxMxP-3S3WM"; // Replace with your own Google API key
const AIRNOW_API_KEY = 'YOUR_AIRNOW_API_KEY'; // Replace with your own AirNow API key

async function fetchWeatherByAddress(address: string) {
  const formattedAddress = address.replace(/ /g, ",");
  const response = await fetch(
    `${PROXY_URL}https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(
      formattedAddress
    )}&benchmark=Public_AR_Current&format=json`
  );
  const data = await response.json();
  return data;
}

async function fetchWeatherByCoordinates(coordinates: any) {
  const weatherResponse = await fetch(
    `${PROXY_URL}https://api.weather.gov/points/${coordinates.y},${coordinates.x}`
  );
  const weatherData = await weatherResponse.json();

  const gridId = weatherData.properties.gridId;
  const gridX = weatherData.properties.gridX;
  const gridY = weatherData.properties.gridY;

  const forecastResponse = await fetch(
    `${PROXY_URL}https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`
  );
  const forecastData = await forecastResponse.json();

  return forecastData.properties.periods;
}

async function fetchWeatherByLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherResponse = await fetch(
            `https://api.weather.gov/points/${latitude},${longitude}`
          );
          const weatherData = await weatherResponse.json();

          const gridId = weatherData.properties.gridId;
          const gridX = weatherData.properties.gridX;
          const gridY = weatherData.properties.gridY;

          const forecastResponse = await fetch(
            `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`
          );
          const forecastData = await forecastResponse.json();

          resolve(forecastData.properties.periods);
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
      reject();
    }
  });
}

async function fetchWeatherByZIPCode(zipCode: string) {
  const geocodeResponse = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(zipCode)}&key=${GOOGLE_API_KEY}`
  );
  const geocodeData = await geocodeResponse.json();

  if (geocodeData.status === "OK" && geocodeData.results.length > 0) {
    const { lat, lng } = geocodeData.results[0].geometry.location;

    const weatherResponse = await fetch(
      `https://api.weather.gov/points/${lat},${lng}`
    );
    const weatherData = await weatherResponse.json();

    const gridId = weatherData.properties.gridId;
    const gridX = weatherData.properties.gridX;
    const gridY = weatherData.properties.gridY;

    const forecastResponse = await fetch(
      `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`
    );
    const forecastData = await forecastResponse.json();

    return forecastData.properties.periods;
  } else {
    throw new Error("Invalid ZIP code");
  }
}

async function fetchAirQuality(latitude: number, longitude: number) {
  const baseUrl = 'https://www.airnowapi.org/aq/observation/latLong/current/';
  const url = `${baseUrl}?format=application/json&latitude=${latitude}&longitude=${longitude}&distance=25&API_KEY=${AIRNOW_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
}

async function fetchCityStateByZIPCode(zipCode: string) {
  const geocodeResponse = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(zipCode)}&key=${GOOGLE_API_KEY}`
  );
  const geocodeData = await geocodeResponse.json();

  if (geocodeData.status === "OK" && geocodeData.results.length > 0) {
    const { address_components } = geocodeData.results[0];
    const cityData = address_components.find((component: any) => component.types.includes("locality"));
    const stateData = address_components.find((component: any) => component.types.includes("administrative_area_level_1"));

    const city = cityData ? cityData.long_name : "";
    const state = stateData ? stateData.short_name : "";

    return { city, state };
  } else {
    throw new Error("Invalid ZIP code");
  }
}

export {
  fetchWeatherByAddress,
  fetchWeatherByCoordinates,
  fetchWeatherByLocation,
  fetchWeatherByZIPCode,
  fetchAirQuality,
  fetchCityStateByZIPCode,
};
