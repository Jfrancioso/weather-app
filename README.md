**Weather App**
A weather forecast application built with JSX, Tailwind CSS, and React.

## Installation
To run the Weather App locally, follow these steps:

## 1. Clone the repository:

<pre>
<code>
git clone https://github.com/Jfrancioso/weather-app.git
</code>
</pre>


## 2. Install dependencies:

<pre>
<code>
cd weather-app
</code>
</pre>
<pre>
<code>
npm install
</code>
</pre>
<pre>
<code>
npm install react react-dom tailwindcss craco --save
</code>
</pre>

## 3. Install the following additional dependencies:
- `react`: JavaScript library for building user interfaces.
- `react-dom`: Package providing DOM-specific methods for React.
- `tailwindcss`: Utility-first CSS framework for styling.
- `craco`: Configuration tool for Create React App.

You can install these dependencies using the following command:

cd weather-app
npm install
npm install react react-dom tailwindcss craco --save


## 4. Create a `tailwind.config.js` file in the project root by running the following command:

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';


## 5. Start the application:
<pre>
<code>
npm run start
</code>
</pre>
The app will be running at http://localhost:3000.

## Usage
- Enter an address in the search box to get the weather forecast for that location.
- Click the "Get Forecast" button to retrieve the forecast.
- To use your current location, click the "Use My Location (Geolocation Icon)" button. Make sure to grant permission for location access when prompted.

**APIs Used**
This application utilizes the following APIs:

- Geocoding API: Used for converting addresses into geographic coordinates.
- Weather API: Provides weather forecast data based on the coordinates of a location.
- Air Quality API: Retrieves current air quality information based on latitude and longitude coordinates. **Currently Not in Use**
- Google API: Used for AutoLoading addresses through a drop-down search bar.

Make sure to replace the placeholder text with the actual names and descriptions of the APIs you are using. Additionally, if you have any specific instructions or requirements for obtaining API keys or credentials, you can mention them in this section as well.

Including this information helps users and contributors understand the external services your application relies on and facilitates their interaction with your project.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please submit a pull request or open an issue on the GitHub repository.

Feel free to copy and use this markdown content for your README file.
