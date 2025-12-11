import React from 'react';
import NoteCard from '../NoteCard/NoteCard';
import './NotesGrid.scss';

const NotesGrid = ({ notes, getCategoryInfo, onEdit, onDelete, formatDate }) => (
  <div className="notes-grid">
    {notes.map((note) => {
      const category = getCategoryInfo(note.category);
      return (
        <NoteCard
          key={note.id}
          note={note}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
          formatDate={formatDate}
        />
      );
    })}
  </div>
);

export default NotesGrid;

