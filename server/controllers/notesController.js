import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/notes.json');

const readNotes = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

const writeNotes = (notes) => {
  fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2), 'utf-8');
};

export const getAllNotes = (req, res) => {
  try {
    let notes = readNotes();
    
    const { category, sort } = req.query;
    
    if (category) {
      notes = notes.filter(note => note.category === category);
    }
    
    if (sort === 'newest') {
      notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'oldest') {
      notes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    res.json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

export const searchNotes = (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false, 
        error: 'Параметр поиска q обязателен' 
      });
    }
    
    const notes = readNotes();
    const searchTerm = q.toLowerCase();
    
    const results = notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm)
    );
    
    res.json({
      success: true,
      query: q,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

export const getNoteById = (req, res) => {
  try {
    const { id } = req.params;
    const notes = readNotes();
    const note = notes.find(n => n.id === parseInt(id));
    
    if (!note) {
      return res.status(404).json({ 
        success: false, 
        error: `Заметка с ID ${id} не найдена` 
      });
    }
    
    res.json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

export const createNote = (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        error: 'Поля title и content обязательны' 
      });
    }
    
    const notes = readNotes();
    
    const newNote = {
      id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
      title,
      content,
      category: category || 'personal',
      createdAt: new Date().toISOString()
    };
    
    notes.push(newNote);
    writeNotes(notes);
    
    res.status(201).json({ 
      success: true, 
      message: 'Заметка создана',
      data: newNote 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

export const updateNote = (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    
    const notes = readNotes();
    const noteIndex = notes.findIndex(n => n.id === parseInt(id));
    
    if (noteIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        error: `Заметка с ID ${id} не найдена` 
      });
    }
    
    if (title) notes[noteIndex].title = title;
    if (content) notes[noteIndex].content = content;
    if (category) notes[noteIndex].category = category;
    
    writeNotes(notes);
    
    res.json({ 
      success: true, 
      message: 'Заметка обновлена',
      data: notes[noteIndex] 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

export const deleteNote = (req, res) => {
  try {
    const { id } = req.params;
    
    const notes = readNotes();
    const noteIndex = notes.findIndex(n => n.id === parseInt(id));
    
    if (noteIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        error: `Заметка с ID ${id} не найдена` 
      });
    }
    
    const deletedNote = notes.splice(noteIndex, 1)[0];
    writeNotes(notes);
    
    res.json({ 
      success: true, 
      message: 'Заметка удалена',
      data: deletedNote 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

