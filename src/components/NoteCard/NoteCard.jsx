import React from 'react';
import './NoteCard.scss';

const NoteCard = ({ note, category, onEdit, onDelete, formatDate }) => (
  <article
    className="note-card"
    style={{ '--accent-color': category.color }}
  >
    <div className="note-header">
      <span
        className="note-category"
        style={{ backgroundColor: category.color }}
      >
        {category.label}
      </span>
      <div className="note-actions">
        <button
          className="action-btn edit"
          onClick={() => onEdit(note)}
          title="Редактировать"
        >
          ✏️
        </button>
        <button
          className="action-btn delete"
          onClick={() => onDelete(note.id)}
          title="Удалить"
        >
          🗑️
        </button>
      </div>
    </div>

    <h3 className="note-title">{note.title}</h3>
    <p className="note-content">{note.content}</p>

    <footer className="note-footer">
      <time className="note-date">{formatDate(note.createdAt)}</time>
    </footer>
  </article>
);

export default NoteCard;

