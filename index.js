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
        // insertData(conn);

        app.post('/insert', function (req, res) {
            insertData(conn);
            res.send('Got a POST request');
          })
    }
})



// Data Insert Function
const insertData = (conn) => {
    
    let sqlQuery = "INSERT INTO `task`(`title`, `date`, `duration`, `type`) VALUES ('Drive', '2022/02/06', '200', 'Learning')";

    conn.query(sqlQuery, (error) => {
        if (error) {
            console.log("Data Insert Failed");
            console.log(error);
        } else {
            console.log("Data Insert Successful");            
        }
    })
}




app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});