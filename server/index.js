import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import notesRouter from './routes/notes.js';
import { requestLogger } from './middleware/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const { env } = globalThis.process || {};
const PORT = env?.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/notes', notesRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`API заметок: http://localhost:${PORT}/api/notes`);
});

