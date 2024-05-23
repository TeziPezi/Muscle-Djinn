const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error('err db:', err);
        return;
    }
    console.log('Verbunden mit der MySQL-Datenbank.');
});


app.post('/Signup', (req, res) => {
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




app.listen(8081, () => {
    console.log("Listening...");
});
