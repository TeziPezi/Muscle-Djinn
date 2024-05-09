const express = require('express');
const db = require('./db');

const app = express();

app.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error executing MySQL query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
