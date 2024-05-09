const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '45.81.234.159',
    user: 'muscle_djinn',
    password: 'sl6PhMaDjHKfOC7h',
    database: 'muscle_djinn',
});

// Verbindungsversuch
connection.connect((err) => {
  if (err) {
    console.error('Fehler beim Verbinden mit der MySQL-Datenbank:', err);
    return;
  }
  console.log('Verbunden mit der MySQL-Datenbank.');

  // Einfache Testabfrage ausführen
  connection.query('SELECT 1 + 1 AS result', (err, rows) => {
    if (err) {
      console.error('Fehler beim Ausführen der Abfrage:', err);
      return;
    }
    console.log('Ergebnis der Abfrage:', rows[0].result);

    // Verbindung schließen
    connection.end((err) => {
      if (err) {
        console.error('Fehler beim Schließen der Verbindung:', err);
        return;
      }
      console.log('Verbindung geschlossen.');
    });
  });
});
