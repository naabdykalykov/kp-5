import React from 'react';
import './LoadingState.scss';

const LoadingState = () => (
  <div className="loading">
    <div className="spinner"></div>
    <p>Загрузка заметок...</p>
  </div>
);

export default LoadingState;

