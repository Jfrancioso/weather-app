# Weather App

A weather forecast application built with JSX, Tailwind CSS, and React.

## Installation

## 1. Clone the repository:

git clone https://github.com/Jfrancioso/weather-app.git


## 2. Install dependencies:

cd weather-app
npm install
npm install react react-dom tailwindcss craco --save

## 3. Install the following additional dependencies:

- `react`: JavaScript library for building user interfaces.
- `react-dom`: Package providing DOM-specific methods for React.
- `tailwindcss`: Utility-first CSS framework for styling.
- `craco`: Configuration tool for Create React App.

You can install these dependencies using the following command:


## 4. Create a `craco.config.js` file in the project root with the following content:

```javascript
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};

Create a tailwind.config.js file in the project root by running the following command:
npx tailwindcss init

npx tailwindcss init
Open the src/index.js file and update the imports as follows:
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

npm run start
The app will be running at http://localhost:3000.

Usage
Enter an address in the search box to get the weather forecast for that location.
Click the "Get Forecast" button to retrieve the forecast.
To use your current location, click the "Use My Location" button. Make sure to grant permission for location access when prompted.
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please submit a pull request or open an issue on the GitHub repository.

Feel free to copy and use this markdown content for your README file.
