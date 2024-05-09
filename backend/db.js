const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '45.81.234.159',
  user: 'test',
  password: 'test',
  database: 'Test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
