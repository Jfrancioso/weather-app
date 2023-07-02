const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

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

export default {
  fetchWeatherByAddress,
  fetchWeatherByCoordinates,
  fetchWeatherByLocation,
};