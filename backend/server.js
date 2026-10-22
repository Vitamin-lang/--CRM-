require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к базе данных
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Ошибка подключения к базе:', err.message);
  } else {
    console.log('Подключено к базе данных SQLite.');
    
    // Создаем таблицу клиентов
    db.run(`CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      company TEXT
    )`, (err) => {
      if (err) console.error("Ошибка создания таблицы клиентов:", err.message);
    });

    // Создаем таблицу сделок
    db.run(`CREATE TABLE IF NOT EXISTS deals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL,
      status TEXT DEFAULT 'new'
    )`, (err) => {
      if (err) console.error("Ошибка создания таблицы сделок:", err.message);
    });
  }
});

// --- API ДЛЯ ПРОВЕРКИ ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Сервер и SQLite работают!' });
});

// --- API ДЛЯ КЛИЕНТОВ ---
app.get('/api/clients', (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/clients', (req, res) => {
  const { name, phone, email, company } = req.body;
  if (!name) return res.status(400).json({ error: "Имя обязательно" });

  const sql = `INSERT INTO clients (name, phone, email, company) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, phone, email, company], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, phone, email, company });
  });
});

// --- API ДЛЯ СДЕЛОК ---
app.get('/api/deals', (req, res) => {
  db.all("SELECT * FROM deals", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/deals', (req, res) => {
  const { title, amount, status } = req.body;
  if (!title) return res.status(400).json({ error: "Название обязательно" });

  const sql = `INSERT INTO deals (title, amount, status) VALUES (?, ?, ?)`;
  db.run(sql, [title, amount || 0, status || 'new'], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, amount, status });
  });
});

// --- API ДЛЯ ДАШБОРДА (СТАТИСТИКА) ---
app.get('/api/dashboard', (req, res) => {
  const stats = {};
  
  // Считаем клиентов
  db.get("SELECT COUNT(*) as count FROM clients", [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    stats.totalClients = row.count;

    // Считаем сделки и их сумму
    db.get("SELECT COUNT(*) as count, SUM(amount) as totalAmount FROM deals", [], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      stats.totalDeals = row.count;
      stats.totalAmount = row.totalAmount || 0;

      res.json(stats);
    });
  });
});

// --- ЗАПУСК СЕРВЕРА ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`=== СЕРВЕР ЗАПУЩЕН НА ПОРТУ ${PORT} ===`);
});