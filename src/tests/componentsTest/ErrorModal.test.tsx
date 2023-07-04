import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorModal from '../../components/ErrorModal';

//test that the ErrorModal component renders correctly
describe('ErrorModal', () => {
  const mockOnClose = jest.fn();
  const mockErrorMessage = 'Test error message';

  it('calls onClose function when close button is clicked', () => {
    render(<ErrorModal onClose={mockOnClose} errorMessage={mockErrorMessage} />);
    const closeButton = screen.getByTestId('close-button'); // Update the test ID
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
