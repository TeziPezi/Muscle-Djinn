const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '45.81.234.159',
  user: 'test',
  password: 'test',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Execute queries here
  connection.query('SELECT * FROM mytable', (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  });

  // Close the connection
  connection.end();
});
