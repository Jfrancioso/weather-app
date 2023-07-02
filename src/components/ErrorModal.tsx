import React from 'react';

type Props = {
  errorMessage: string;
  onClose: () => void;
};

const ErrorModal: React.FC<Props> = ({ errorMessage, onClose }) => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <p className="text-red-500 text-center text-lg mb-4">{errorMessage}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default ErrorModal;
