const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'research_collaboration_db'
});

connection.connect((err) => {

    if(err){
        console.log(err);
    } else {
        console.log('MySQL Connected');
    }

});

module.exports = connection;