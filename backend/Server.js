const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["Post", "GET"],
    credentials: true
}
));

app.use(cookieParser());

// Datenbank Verbindung
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

// hier wird der Token überprüft
const verifyUser = (req, res, next) => {
    const existingToken = req.cookies.token;
    if (!existingToken) {

        return res.json({ Error: "You are not logged in" });
    }
    else {

        jwt.verify(existingToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token doesn't match!" });
            }
            else {
                req.username = decoded.username
            };
            next();

        })
    }
}

app.get('/logged', verifyUser, (req, res) => {
    return res.json({ loginValue: true, username: req.username })
})

// hier wird User authentifiziert und ein Json Web Token in Cookie erstellt
app.post('/loginForm', async (req, res) => {
    
    const sql = "SELECT * FROM Nutzer WHERE Username = ? AND Password = ?";

    const sentloginUserName = req.body.loginUsername
    const sentLoginPassword = req.body.loginPassword

    try{
        [data] = await promisePool.query(sql, [sentloginUserName, sentLoginPassword]);
        
        if (data.length > 0) {

            const username = data[0].Username;

            const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

            res.cookie("token", token);


            return res.json({ loginValue: true, message: 'Login successful', token })

        } else {
            return res.json({ loginValue: false, message: 'Login failed' });
        }
    } catch (err) {
        console.error("Login error in server", err);
        return res.json({Error: "Login error in server"})
    }

})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout was successful' });
})

app.listen(8081, () => {
    console.log("Server is running on port 8081");
})