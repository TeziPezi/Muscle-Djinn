const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: process.env.DB_HOST || '45.81.234.159',
    user: process.env.DB_USER || 'muscle_djinn',
    password: process.env.DB_PASSWORD || 'sl6PhMaDjHKfOC7h',
    database: process.env.DB_NAME || 'muscle_djinn',
});

connection.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der MySQL-Datenbank:', err);
        return;
    }
    console.log('Verbunden mit der MySQL-Datenbank.');
});

// Übung erstellen
app.post("/uebung_erstellen", (req, res) => {
    const { bezeichnung, muskelgruppe, beschreibung } = req.body;

    const query = 'INSERT INTO Uebung (bezeichnung, muskelgruppe, beschreibung) VALUES (?, ?, ?)';
    
    connection.query(query, [bezeichnung, muskelgruppe, beschreibung], (err, results) => {
        if (err) {
            console.error('Fehler beim Einfügen der Daten:', err);
            return res.status(500).json({ error: 'Fehler beim Einfügen der Daten' });
        }
        console.log('Daten erfolgreich eingefügt:', results);
        res.status(200).json({ message: 'Übung erfolgreich erstellt' });
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081...");
});
