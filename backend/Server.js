const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
//const path = require('path');

dotenv.config({ path: './.env'});

const app = express();

//let initialPath = path.join(__dirname, )

app.use(bodyParser.json());

/*app.listen(3000, (req, res) => {
  console.log('listening on port 3000')
})*/

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});


// Verbindungsversuch
connection.connect((err) => {
  if (err) {
    console.error('Fehler beim Verbinden mit der MySQL-Datenbank:', err);
    return;
  }
  console.log('Verbunden mit der MySQL-Datenbank.');

//const  Username = 'MaxMustermann';
//const Password =  'Passwort123';

app.post('../frondend/public/src/pages/loginForm', (req, res) => {
  const {Username, Password} = req.body;

  if (!Username || !Password){
    return res.status(400).send({message: 'Bitte Benutzername und Passwort angeben.'});
  }
})

  // Einfache Testabfrage ausführen
  connection.query('SELECT * FROM `Nutzer` WHERE Username = ? AND Password = ?', [Username, Password], (err, results) => {
    if (err) {
      console.error('Fehler beim Ausführen der Abfrage:', err);
      return res.status(500).send({ message: 'Interner Serverfehler.'});
    }

    if (results.length > 0){
      return res.status(200).send({ message: 'Erfolgreich eingeloggt.'});
    } else {
      return res.status(401).send({ message: 'Ungültiger Benutzername oder Passwort.' });
    }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log('Server läuft auf Port ${PORT}');
  })
   
    // Verbindung schließen
    /*connection.end((err) => {
      if (err) {
        console.error('Fehler beim Schließen der Verbindung:', err);
        return;
      }
      console.log('Verbindung geschlossen.');
    });*/
  });
});