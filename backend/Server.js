const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './.env'});

const app = express();

app.use(express.json());

app.use(cors());



const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

app.post('/loginForm', (req, res) =>{
    const sql = "SELECT * FROM Nutzer WHERE Username = ? AND Password = ?";

    const sentloginUserName = req.body.username
    const sentLoginPassword = req.body.password
  
    connection.query(sql, [sentloginUserName, sentLoginPassword], (err, data) =>{
        if(err) return res.json("Error");
        if(data.length > 0) {
            return res.json({loginValue: true, message: 'Login successful'})
        } else {
            return res.json({loginValue: false, message: 'Login failed'})
        }
    })
})

app.listen(8081, () => {
    console.log("Server is running on port 8081");
})
