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
  
    connection.query(sql, [req.body.username, req.body.password], (err, data) =>{
        if(err) return res.json("Error");
        if(data.length > 0) {
            return res.json("Login Successfully")
        } else {
            return res.json("No Record")
        }
    })
})

app.listen(8081, () => {
    console.log("Listening...");
})
