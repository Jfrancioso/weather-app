import React from 'react';

type Props = {
  errorMessage: string;
  onClose: () => void;
};

const ErrorModal: React.FC<Props> = ({ errorMessage, onClose }) => (
  <div className="error-modal">
    <div className="error-modal-inner">
      <p className="error-message">{errorMessage}</p>
      <button
        className="error-close-button"
        onClick={onClose}
        data-testid="close-button" // Changed data-testid to "close-button"
      >
        Close
      </button>
    </div>
  </div>
);

export default ErrorModal;
