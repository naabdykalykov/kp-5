import React from 'react';
import { CATEGORIES } from '../../shared/categories';
import './NoteFormModal.scss';

const NoteFormModal = ({
  isOpen,
  editingNote,
  formData,
  onChange,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{editingNote ? 'Редактировать заметку' : 'Новая заметка'}</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Заголовок</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="Введите заголовок"
              required
            />
          </div>

          <div className="form-group">
            <label>Содержимое</label>
            <textarea
              value={formData.content}
              onChange={(e) => onChange('content', e.target.value)}
              placeholder="Введите текст заметки"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Категория</label>
            <select
              value={formData.category}
              onChange={(e) => onChange('category', e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              {editingNote ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteFormModal;

