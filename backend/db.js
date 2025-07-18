const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // your MySQL username
  password: '',        // your MySQL password (if any)
  database: 'student_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected!');
});

module.exports = connection;
