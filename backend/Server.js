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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Kalender-Komponente -> Datenbankabruf für Marker
app.get('/trainingDates', verifyUser, async (req, res) => {
    try {
        const sql = "SELECT Datum FROM Kalender WHERE UserID = (SELECT UserID FROM Nutzer WHERE Username = ?)";
        const [results] = await promisePool.query(sql, [req.username]);
        res.json(results);
    } catch (err) {
        console.error('Error retrieving training data:', err);
        res.status(500).send('Server Error');
    }
});
// Kalender-Komponente -> Trainingsplan nach Datum (+1 Tag, wegen Dateninkonsistenz)
app.get('/trainingByDate', verifyUser, async (req, res) => {
    let { date } = req.query;
    try {
        // Datum um einen Tag erhöhen
        let selectedDate = new Date(date);
        selectedDate.setDate(selectedDate.getDate() + 1);
        let adjustedDate = selectedDate.toISOString().split('T')[0];

        const sql = `
            SELECT p.Bezeichnung, k.Datum
            FROM Kalender k
            JOIN Plan p ON k.PlanID = p.PlanID
            WHERE k.UserID = (SELECT UserID FROM Nutzer WHERE Username = ?)
            AND k.Datum = ?
        `;
        const [results] = await promisePool.query(sql, [req.username, adjustedDate]);
        if (results.length > 0) {
            res.json({ training: results[0].Bezeichnung });
        } else {
            res.json({ training: 'No training on this day' });
        }
    } catch (err) {
        console.error('Error retrieving training for the date:', err);
        res.status(500).send('Server Error');
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Suche nach Benutzer, die Trainingspläne erstellt haben
app.get('/searchUser', async (req, res) => {
    const { username } = req.query;
    const sql = `
        SELECT DISTINCT Nutzer.UserID, Nutzer.Username 
        FROM Nutzer 
        JOIN Plan ON Nutzer.UserID = Plan.UserID 
        WHERE Nutzer.Username LIKE ?
    `;
    try {
        const [results] = await promisePool.query(sql, [`%${username}%`]);
        res.json(results);
    } catch (err) {
        console.error('Error searching user:', err);
        res.status(500).send('Server Error');
    }
});
// Importiere Pläne
app.post('/importPlans', async (req, res) => {
    const { sourceUserID, targetUserID } = req.body;
    const sqlGetPlans = 'SELECT PlanID, Bezeichnung, Beschreibung FROM Plan WHERE UserID = ?';
    const sqlInsertPlan = 'INSERT INTO Plan (Bezeichnung, Beschreibung, UserID) VALUES (?, ?, ?)';
    const sqlGetExercises = 'SELECT UbungID FROM Plan_Ubung WHERE PlanID = ?';
    const sqlInsertPlanExercise = 'INSERT INTO Plan_Ubung (PlanID, UbungID, UserID) VALUES (?, ?, ?)';

    try {
        const [plans] = await promisePool.query(sqlGetPlans, [sourceUserID]);

        for (const plan of plans) {
            const [insertResult] = await promisePool.query(sqlInsertPlan, [plan.Bezeichnung, plan.Beschreibung, targetUserID]);
            const newPlanID = insertResult.insertId;

            const [exercises] = await promisePool.query(sqlGetExercises, [plan.PlanID]);
            for (const exercise of exercises) {
                await promisePool.query(sqlInsertPlanExercise, [newPlanID, exercise.UbungID, targetUserID]);
            }
        }
        res.json({ message: 'Plans imported successfully' });
    } catch (err) {
        console.error('Error importing plans:', err);
        res.status(500).send('Server Error');
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    pool.query('SELECT UbungID, bezeichnung, muskelgruppe, beschreibung ,UserID FROM Ubung', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/loeschen_ubung/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Received request to delete Übung with ID: ${id}`); // Debug-Ausgabe

    // SQL-Statement für das Löschen der Übung
    const sql = 'DELETE FROM Ubung WHERE UbungID = ?';

    pool.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error executing query', err); // Debug-Ausgabe
            return res.status(500).json({ error: 'Fehler beim Löschen der Übung' });
        }
        if (results.affectedRows === 0) {
            console.log('No Übung found with this ID'); // Debug-Ausgabe
            return res.status(404).json({ error: 'Keine Übung mit dieser ID gefunden' });
        }
        console.log(`Übung with ID: ${id} deleted successfully`); // Debug-Ausgabe
        res.json({ message: 'Übung erfolgreich gelöscht' });
    });
});




// Überprüfung ob der User eingeloggt ist
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

// hier werden User Daten geupdated
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

// hier werden die Pläne und Übungen vom User geholt
app.get('/plan/:userID', (req, res) => {

    const userID = req.params.userID;

   const sql1 = `
    SELECT Plan.PlanID, Plan.Bezeichnung AS PlanBezeichnung, Plan.Beschreibung AS PlanBeschreibung, 
         Ubung.UbungID, Ubung.Bezeichnung AS UbungBezeichnung, Ubung.Muskelgruppe, Ubung.Beschreibung AS UbungBeschreibung
        FROM Plan
        JOIN Plan_Ubung ON Plan.PlanID = Plan_Ubung.PlanID
        JOIN Ubung ON Plan_Ubung.UbungID = Ubung.UbungID
        WHERE Plan.UserID = ?
  `;

    const sql2 = 'SELECT ubungID, bezeichnung, muskelgruppe, beschreibung FROM Ubung WHERE UserID = ?'

    pool.query(sql1, [userID], (err, plans) => {
        if (err) {
            return res.status(500).json({ error: 'Fehler beim Abrufen der Pläne' });
        }

        pool.query(sql2, [userID], (err, allExercises) => {
            if (err) {
                return res.status(500).json({ error: 'Fehler beim Abrufen der Übungen' });
            }
            
            return res.json({plans, allExercises});
        })
        
        
    })
});

app.post('/createPlan', (req, res) => {
    const sql1 = 'INSERT INTO Plan (Bezeichnung, Beschreibung, UserID) VALUES (?, ?, ?)';

    const sql2 = 'SELECT PlanID FROM Plan WHERE Bezeichnung = ? AND Beschreibung = ? AND UserID = ?';

    const bezeichnung = req.body.bezeichnung;
    const beschreibung = req.body.beschreibung;
    const userID = req.body.userID;


    pool.query(sql1, [bezeichnung, beschreibung, userID], (err, response) => {
        if (err) {
            return res.status(500).json({ error: 'Fehler beim Einfügen der Daten' });
        }
        pool.query(sql2, [bezeichnung, beschreibung, userID], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Fehler beim suchen der PlanID' });
            }
            
            return res.json({planID: results[0].PlanID});
        })
    })
})

app.post('/plan_ubung', (req, res) => {
    const sql = 'INSERT INTO Plan_Ubung (PlanID, UbungID, UserID) VALUES (?, ?, ?)'

    pool.query(sql, [req.body.planID, req.body.ubungID, req.body.userID], (err, response) => {
        if (err){
            return res.status(500).json({ error: 'Fehler beim Einfügen der Daten' });
        }
        return;
    })
})

app.get('/deletePlan/:planID', (req, res) => {
    const sql1 = 'DELETE FROM Plan_Ubung WHERE PlanID = ?'
    const sql2 = 'DELETE FROM Plan WHERE PlanID = ?'

    const planID = req.params.planID;

    pool.query(sql1, [planID], (err, response) => {
        if (err) {
            return res.status(500).json({ error: 'Fehler beim Löschen des Plans' })
        }
        pool.query(sql2, [planID], (err, response2) => {
            if (err) {
                return res.status(500).json({ error: 'Fehler beim Löschen des Plans' })
            }
        })
        return res.json({message: "Plan erfolgreich gelöscht"});
    })

})


// hier wird der User Ausgeloggt
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout was successful' });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});