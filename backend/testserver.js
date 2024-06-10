const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');

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

// Beispielhaftes festgelegtes Passwort
const presetPassword = "hash1234";

bcrypt.hash(presetPassword, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Fehler beim Hashen des Passworts:', err);
        return;
    }
    console.log('Gehashte Passwort:', hashedPassword);

    // Beispielhafte Benutzerdaten
    const username = "hash";
    const email = "hash@hash.com";

    // Benutzerregistrierung mit festgelegtem Passwort
    app.post("/register", (req, res) => {
        const query = 'INSERT INTO Nutzer (username, email, password) VALUES (?, ?, ?)';

        connection.query(query, [username, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Fehler beim Einfügen der Daten:', err);
                return res.status(500).json({ error: 'Fehler beim Einfügen der Daten' });
            }
            console.log('Daten erfolgreich eingefügt:', results);
            res.status(200).json({ message: 'Registrierung erfolgreich' });
        });
    });

    // Testaufruf zur Registrierung
    app.get('/testregister', (req, res) => {
        const query = 'INSERT INTO Nutzer (username, email, password) VALUES (?, ?, ?)';
        connection.query(query, [username, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Fehler beim Einfügen der Daten:', err);
                return res.status(500).json({ error: 'Fehler beim Einfügen der Daten' });
            }
            console.log('Daten erfolgreich eingefügt:', results);
            res.status(200).json({ message: 'Testregistrierung erfolgreich' });
        });
    });

    app.listen(8081, () => {
        console.log("Listening on port 8081...");
    });
});
