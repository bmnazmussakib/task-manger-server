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

        // Insert Data
        app.post('/insert', function (req, res) {
            insertData(conn);
            res.send('Got a POST request');
        })


        //  Delete Data
        app.delete('/delete', function (req, res) {
            dataDelete(conn);
            res.send('Data Deleted');
        })


        // Update Data
        app.put('/update', function (req, res) {
            dataUpdate(conn);
            res.send('Data Updated')
          })
    }
})



// Data Insert Function
const insertData = (conn) => {

    let insertQuery = "INSERT INTO `task`(`title`, `date`, `duration`, `type`) VALUES ('Drive', '2022/02/06', '200', 'Learning')";

    conn.query(insertQuery, (error) => {
        if (error) {
            console.log("Data Insert Failed");
            console.log(error);
        } else {
            console.log("Data Insert Successful");
        }
    })
}


// Data Delete Function
const dataDelete = (conn) => {

    let deleteQuery = "DELETE FROM `task` WHERE `id`='5' ";

    conn.query(deleteQuery, (error) => {
        if (error) {
            console.log("Data Delete Failed");
            console.log(error);
        } else {
            console.log("Data Delete Successful");
        }
    })

}


// Data Update function
const dataUpdate = (conn) => {
    let updateQuery = "UPDATE `task` SET `title`='Travel' WHERE `id`='7' ";

    conn.query(updateQuery, (error) => {
        if (error) {
            console.log("Data Update Failed");
            console.log(error);
        } else {
            console.log("Data Update Successful");
        }
    })

}





app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});