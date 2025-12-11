import React from 'react';
import './NoteControls.scss';

const NoteControls = ({
  searchQuery,
  filterCategory,
  onSearchChange,
  onFilterChange,
  onOpenForm,
  categories
}) => (
  <div className="controls">
    <div className="search-box">
      <input
        type="text"
        placeholder="Поиск заметок..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>

    <div className="filters">
      <select
        value={filterCategory}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        <option value="">Все категории</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>

    <button className="btn btn-primary" onClick={onOpenForm}>
      + Новая заметка
    </button>
  </div>
);

export default NoteControls;

