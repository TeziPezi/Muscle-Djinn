const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

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
                return res.json({ Error: "Token Error" });
            }
            else {
                req.username = decoded.username
            };
            next();

        })
    }
}


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

        const sql = 'INSERT INTO Nutzer (Username, E_mail, Password) VALUES (?, ?, ?)';

        pool.query(sql, [Username, E_mail, hashedPassword], (err, results) => {
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
    const { bezeichnung, muskelgruppe, beschreibung,userID } = req.body;
    console.log("Request Body:", req.body);
    const sql = 'INSERT INTO Ubung (Bezeichnung, Muskelgruppe, Beschreibung,UserID) VALUES (?, ?, ?, ?)';

    pool.query(sql, [bezeichnung, muskelgruppe, beschreibung,userID], (err, results) => {
        if (err) {
            console.error('Fehler beim Einfügen der Daten:', err);
            return res.status(500).json({ error: 'Fehler beim Einfügen der Daten' });
        }
        console.log('Daten erfolgreich eingefügt:', results);
        
        res.status(200).json({ message: 'Übung erfolgreich erstellt' });
    });
});

app.get('/Ubung', (req, res) => {
    pool.query('SELECT bezeichnung, muskelgruppe, beschreibung FROM Ubung', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});




app.get('/logged', verifyUser, async (req, res) => {

    const sql = "SELECT UserID FROM Nutzer WHERE Username = ?";

    pool.query(sql, [req.username], (err, results) => {
        if (err) {
            return res.json({ error: 'Fehler beim Lesen der UserID' })
        }
        return res.json({ loginValue: true, username: req.username, userID: results[0].UserID })
    })


})

// hier wird User authentifiziert und ein Json Web Token in Cookie erstellt
app.post('/loginForm', async (req, res) => {

    const sql = "SELECT * FROM Nutzer WHERE Username = ?";

    const sentloginUserName = req.body.loginUsername
    const sentLoginPassword = req.body.loginPassword

    try {
        [data] = await promisePool.query(sql, [sentloginUserName]);

        if (data.length > 0) {

            bcrypt.compare(sentLoginPassword.toString(), data[0].Password, (err, response) => {
                if (err) {
                    return res.json({ loginValue: false, message: 'Login failed' })
                };

                if (response) {

                    const username = data[0].Username;

                    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

                    res.cookie("token", token);

                    return res.json({ loginValue: true, message: 'Login successful', token })
                }

                else {
                    return res.json({ loginValue: false, message: 'Login failed' });
                }
            })
        } else {
            return res.json({ loginValue: false, message: 'Login failed' });
        }
    } catch (err) {
        console.error("Login error in server", err);
        return res.json({ Error: "Login error in server" })
    }

})

app.post('/updateUser', async (req, res) => {

    const sql = "UPDATE Nutzer SET Username = ?, E_Mail = ?, Password = ? WHERE UserID = ?";

    const passwordString = String(req.body.password);

    const hashedPassword = await bcrypt.hash(passwordString, 10);

    pool.query(sql, [req.body.username, req.body.email, hashedPassword, req.body.userID], (err, results) => {
        if (err) {
            return res.json({ message: "Fehler beim Update" })
        }
        res.clearCookie('token');
        return res.json({ message: "Erfolgreicher Update" })
    });
});

app.get('/plan/:userID', (req, res) => {

    const userID = req.params.userID;

    sql = `
    SELECT Plan.PlanID, Plan.Bezeichnung AS PlanBezeichnung, Plan.Beschreibung AS PlanBeschreibung, 
         Ubung.UbungID, Ubung.Bezeichnung AS UbungBezeichnung, Ubung.Muskelgruppe, Ubung.Beschreibung AS UbungBeschreibung
        FROM Plan
        JOIN Plan_Ubung ON Plan.PlanID = Plan_Ubung.PlanID
        JOIN Ubung ON Plan_Ubung.UbungID = Ubung.UbungID
        WHERE Plan.UserID = ?
  `;

    pool.query(sql, [userID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Fehler beim Abrufen der Pläne und Übungen' });
        }
           
        return res.json(results);
        
    })
});




app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout was successful' });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});