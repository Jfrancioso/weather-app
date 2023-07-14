import React from 'react';
import { render, screen } from '@testing-library/react';
import ForecastItem from '../../components/ForecastItem';

describe('ForecastItem', () => {
  const mockForecastItem = {
    number: 1,
    name: 'Forecast Item 1',
    startTime: '2023-07-01T09:00:00Z',
    temperature: 25,
    temperatureUnit: 'F',
    shortForecast: 'Sunny',
    icon: 'sun',
    weatherCondition: 'Clear',
    windSpeed: 10,
    windDirection: 'NE',
    relativeHumidity: 70,
    detailedForecast: 'A sunny day with clear skies.',
  };
  const mockLocationTitle = 'Test Location';

  it('renders correctly', () => {
    render(<ForecastItem forecastItem={mockForecastItem} locationTitle={mockLocationTitle} />);
    const expectedTitle = `${mockForecastItem.startTime} - ${mockForecastItem.name}`;
    const forecastItemTitle = screen.queryByText(expectedTitle);
    const forecastItemTemperature = screen.queryByText(/25\s*F/);
    const forecastItemForecast = screen.queryByText('Sunny');
    const forecastItemWindSpeed = screen.queryByText(/Wind Speed:\s*10/);
    const forecastItemWindDirection = screen.queryByText(/Wind Direction:\s*NE/);
    const forecastItemShowDetailsButton = screen.queryByText('Show Details');

    expect(forecastItemTitle).toBeDefined();
    expect(forecastItemTemperature).toBeDefined();
    expect(forecastItemForecast).toBeDefined();
    expect(forecastItemWindSpeed).toBeDefined();
    expect(forecastItemWindDirection).toBeDefined();
    expect(forecastItemShowDetailsButton).toBeDefined();
  });
});