import React, { useCallback, useEffect, useState } from 'react';

import { createNote, deleteNote, findNotes, getNotes, updateNote } from '../api/notes';
import { formatNoteDate } from '../shared/formatDate';
import { CATEGORIES } from '../shared/categories';
import EmptyState from '../components/EmptyState/EmptyState';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import LoadingState from '../components/LoadingState/LoadingState';
import NoteFormModal from '../components/NoteFormModal/NoteFormModal';
import NoteControls from '../components/NoteControls/NoteControls';
import NotesGrid from '../components/NotesGrid/NotesGrid';
import './NotesPage.scss';

const INITIAL_FORM = {
  title: '',
  content: '',
  category: 'personal'
};

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const getCategoryInfo = (categoryValue) =>
    CATEGORIES.find((c) => c.value === categoryValue) || CATEGORIES[0];

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setEditingNote(null);
    setIsFormOpen(false);
  };

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getNotes(filterCategory);
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filterCategory]);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      loadNotes();
      return;
    }

    try {
      setLoading(true);
      const data = await findNotes(query);
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadNotes]);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const data = await createNote(formData);
      setNotes([...notes, data]);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingNote) return;

    try {
      const data = await updateNote(editingNote.id, formData);
      setNotes(notes.map((n) => (n.id === editingNote.id ? data : n)));
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить эту заметку?')) return;

    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditForm = (note) => {
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category
    });
    setEditingNote(note);
    setIsFormOpen(true);
  };

  useEffect(() => {
    loadNotes();
  }, [filterCategory, loadNotes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [handleSearch, searchQuery]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">📝 Заметки</h1>
          <p className="subtitle">Express.js + React Frontend</p>
        </div>
      </header>

      <main className="main">
        <NoteControls
          searchQuery={searchQuery}
          filterCategory={filterCategory}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilterCategory}
          onOpenForm={() => setIsFormOpen(true)}
          categories={CATEGORIES}
        />

        <ErrorMessage message={error} onClose={() => setError(null)} />

        <NoteFormModal
          isOpen={isFormOpen}
          editingNote={editingNote}
          formData={formData}
          onChange={handleFormChange}
          onClose={resetForm}
          onSubmit={editingNote ? handleUpdate : handleCreate}
        />

        {loading ? (
          <LoadingState />
        ) : notes.length === 0 ? (
          <EmptyState />
        ) : (
          <NotesGrid
            notes={notes}
            getCategoryInfo={getCategoryInfo}
            onEdit={openEditForm}
            onDelete={handleDelete}
            formatDate={formatNoteDate}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Express.js + React Frontend</p>
      </footer>
    </div>
  );
};

export default NotesPage;

