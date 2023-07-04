import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchForm from '../../components/SearchForm';

//mockup of the SearchForm component
describe('SearchForm', () => {
  const mockOnSearchByZIPCode = jest.fn();
  const mockOnSearch = jest.fn();
  const mockOnUseMyLocation = jest.fn();
  const mockIsLocationBlocked = false;

  // Test that the SearchForm component renders correctly
  it('handles search by ZIP code', () => {
    render(
      <SearchForm
        onSearchByZIPCode={mockOnSearchByZIPCode}
        onSearch={mockOnSearch}
        onUseMyLocation={mockOnUseMyLocation}
        isLocationBlocked={mockIsLocationBlocked}
      />
    );

    const zipCodeInput = screen.getByLabelText('ZIP Code');
    const searchButton = screen.getByRole('button', { name: 'Get Forecast' });


    console.log(screen.debug());

    fireEvent.change(zipCodeInput, { target: { value: '12345' } });
    fireEvent.click(searchButton);

    // Add assertions to verify the expected behavior when searching by ZIP code
    expect(mockOnSearchByZIPCode).toHaveBeenCalledWith('12345');
  });

});
