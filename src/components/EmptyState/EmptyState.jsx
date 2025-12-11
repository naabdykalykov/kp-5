import React from 'react';
import './EmptyState.scss';

const EmptyState = () => (
  <div className="empty-state">
    <span className="empty-icon">📋</span>
    <h3>Заметок пока нет</h3>
    <p>Создайте свою первую заметку!</p>
  </div>
);

export default EmptyState;

