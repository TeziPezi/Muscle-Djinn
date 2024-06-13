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

// User registration
app.post("/register", async (req, res) => {
    const { Username, E_mail, Password } = req.body;

    try {
        console.log('Received registration data:', { Username, E_mail, Password });

        // Ensure the password is a string
        const passwordString = String(Password);
        console.log('Password as string:', passwordString);

        // Hash the password
        const hashedPassword = await bcrypt.hash(passwordString, 10);
        console.log('Hashed password:', hashedPassword);

        const query = 'INSERT INTO Nutzer (Username, E_mail, Password) VALUES (?, ?, ?)';

        connection.query(query, [Username, E_mail, hashedPassword], (err, results) => {
            if (err) {
                console.error('Fehler beim Einfügen der Daten:', err);
                return res.status(500).json({ error: 'Fehler beim Einfügen der Daten' });
            }
            console.log('Daten erfolgreich eingefügt:', results);
            res.status(200).json({ message: 'Registrierung erfolgreich' });
        });
    } catch (err) {
        console.error('Fehler beim Hashen des Passworts:', err);
        res.status(500).json({ error: 'Fehler beim Hashen des Passworts' });
    }
});

// Übung erstellen
app.post("/uebung_erstellen", (req, res) => {
    const { bezeichnung, muskelgruppe, beschreibung } = req.body;

    const query = 'INSERT INTO Ubung (Bezeichnung, Muskelgruppe, Beschreibung) VALUES (?, ?, ?)';
    
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
