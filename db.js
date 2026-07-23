const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Akshu@123',
    database: 'research_db'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting:', err);
    } else {
        console.log('MySQL Connected ✅');
    }
});

module.exports = db;