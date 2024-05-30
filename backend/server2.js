const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');


dotenv.config({ path: './.env'});

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 } // Set to true if using HTTPS
}));

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});


app.post('/loginForm', (req, res) => {
    const sql = "SELECT * FROM Nutzer WHERE Username = ? AND Password = ?";
    const sentloginUserName = req.body.username;
    const sentLoginPassword = req.body.password;

    connection.query(sql, [sentloginUserName, sentLoginPassword], (err, data) => {
        if (err) return res.json("Error");
        if (data.length > 0) {
           req.session.username = data[0].Username;
            return res.json({ loginValue: true, username: req.session.username, message: 'Login successful' });
        } else {
            return res.json({ loginValue: false, message: 'Login failed' });
        }
    });
});



app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
