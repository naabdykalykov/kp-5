import React from 'react';
import './ErrorMessage.scss';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      {message}
      <button onClick={onClose}>✕</button>
    </div>
  );
};

export default ErrorMessage;

