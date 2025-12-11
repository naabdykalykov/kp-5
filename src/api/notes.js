const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/notes';

const parseResponse = async (response, defaultMessage) => {
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || defaultMessage);
  }

  return data.data;
};

export const getNotes = async (category) => {
  let url = API_URL;
  const params = new URLSearchParams();

  if (category) {
    params.append('category', category);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);
  return parseResponse(response, 'Не удалось загрузить заметки');
};

export const findNotes = async (query) => {
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
  return parseResponse(response, 'Не удалось выполнить поиск');
};

export const createNote = async (payload) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return parseResponse(response, 'Не удалось создать заметку');
};

export const updateNote = async (id, payload) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return parseResponse(response, 'Не удалось обновить заметку');
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return parseResponse(response, 'Не удалось удалить заметку');
};

