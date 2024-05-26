const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(cors()); // CORS Middleware

const connection = mysql.createConnection({
    host: '45.81.234.159',
    user: 'muscle_djinn',
    password: 'sl6PhMaDjHKfOC7h',
    database: 'muscle_djinn',
});

connection.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der MySQL-Datenbank:', err);
        return;
    }
    console.log('Verbunden mit der MySQL-Datenbank.');
});

// Sign-Up Route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO Nutzer (Username, Email, Password) VALUES (?, ?, ?)";

    connection.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Fehler beim Einfügen in die Datenbank:', err);
            return res.json("Error");
        }
        return res.json("User created successfully!");
    });
});

// Login Route
app.post('/loginForm', (req, res) => {
    const sql = "SELECT * FROM Nutzer WHERE Username = ? AND Password = ?";
  
    connection.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) return res.json("Error");
        if (data.length > 0) {
            return res.json("Login Successfully");
        } else {
            return res.json("No Record");
        }
    });
});

app.listen(8081, () => {
    console.log("Listening...");
});





