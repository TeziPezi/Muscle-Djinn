const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', // Stelle sicher, dass dies die URL deiner React-Anwendung ist
    credentials: true,
};
app.use(cors(corsOptions));

const connection = mysql.createConnection({
    host: process.env.DB_HOST || '45.147.7.157',
    user: process.env.DB_USER || 'muscledjinn',
    password: process.env.DB_PASSWORD || 'sl6PhMaDjHKfOC7h',
    database: process.env.DB_NAME || 'muscledjinn',
});

const JWT_SECRET_KEY = 'jwt-secret-key';

connection.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der MySQL-Datenbank:', err);
        return;
    }
    console.log('Verbunden mit der MySQL-Datenbank.');
});

app.get('/alle_Ubung', (req, res) => {
    connection.query('SELECT * FROM Ubung', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081...");
});
