import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchForm from '../../components/SearchForm';

describe('SearchForm', () => {
  const mockOnSearchByZIPCode = jest.fn();
  const mockOnSearch = jest.fn();
  const mockOnUseMyLocation = jest.fn();
  const mockIsLocationBlocked = false;
  const mockOnChangeNumOfDays = jest.fn();
  const mockSetErrorModalOpen = jest.fn();

  // Test that the SearchForm component renders correctly
  it('handles search by ZIP code', () => {
    render(
      <SearchForm
        onSearchByZIPCode={mockOnSearchByZIPCode}
        onSearch={mockOnSearch}
        onUseMyLocation={mockOnUseMyLocation}
        isLocationBlocked={mockIsLocationBlocked}
        onChangeNumOfDays={mockOnChangeNumOfDays} // Change prop name to onchangeNumOfDays
        errorMessage=''
        setErrorModalOpen={mockSetErrorModalOpen} // Change prop name to setErrorModalOpen
      />
    );

    const zipCodeInput = screen.getByLabelText('ZIP Code');
    const searchButton = screen.getByRole('button', { name: 'Get Forecast' });

    fireEvent.change(zipCodeInput, { target: { value: '12345' } });
    fireEvent.click(searchButton);

    expect(mockOnSearchByZIPCode).toHaveBeenCalledWith('12345');
  });
});
