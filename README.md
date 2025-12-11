# Notes App (Express + React)

Небольшое приложение для заметок: REST API на Express, фронтенд на React/Vite.

## Возможности
- CRUD заметок
- Поиск по заголовку и тексту
- Фильтр по категории

## Структура
```
kp-5/
├─ server/           // backend (Express)
│  ├─ index.js
│  ├─ routes/
│  ├─ controllers/
│  ├─ middleware/
│  └─ data/notes.json
├─ src/              // frontend (React)
│  ├─ api/
│  ├─ components/    // каждая папка = компонент (.jsx + .scss)
│  ├─ pages/
│  ├─ shared/
│  ├─ styles/        // base.scss, buttons.scss
│  ├─ App.jsx
│  └─ main.jsx
└─ package.json
```

## Запуск
```bash
npm install

# терминал 1: сервер
npm run server

# терминал 2: фронт
npm run dev
# открыть http://localhost:5173
```

## API
`/api/notes`
- `GET /` — все заметки, `?category=work` для фильтра
- `GET /search?q=текст` — поиск
- `GET /:id` — заметка по id
- `POST /` — создать
- `PUT /:id` — обновить
- `DELETE /:id` — удалить

## Стек
- Backend: Express
- Frontend: React, Vite, SCSS (`sass-embedded`)
