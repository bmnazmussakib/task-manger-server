const express = require('express');
const app = express();

const mysql = require('mysql');

const databaseConnectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
}

const conn = mysql.createConnection(databaseConnectionConfig)

// port
const PORT = 1010;

conn.connect((error) => {
    if (error) {
        console.log("Connection Failed");
        console.log(error);
    } else {
        console.log("Connection Successful");
    }
})

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });