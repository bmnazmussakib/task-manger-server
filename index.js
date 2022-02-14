// Express JS
const express = require('express');
const app = express();

// port
const PORT = 1010;


// Cors
const cors = require('cors');
app.use(cors());


// Body Parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// MySQL
const mysql = require('mysql');

// Database Config
const databaseConnectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
}


const conn = mysql.createConnection(databaseConnectionConfig)



conn.connect((error) => {
    if (error) {
        console.log("Connection Failed");
        console.log(error);
    } else {
        console.log("Connection Successful");



        // Insert Data---------------------------------
        app.post('/insert', function (req, res) {
            const title = req.body.task;
            const date = req.body.date;
            const duration = req.body.duration;
            const type = req.body.type;

            const sql = "INSERT INTO task VALUES ?";
            const values = [['null', title, date, duration, type]];

            conn.query(sql, [values], (error) => {
                if (error) {
                    console.log("Data Insert Failed");
                    console.log(error);
                } else {
                    console.log("Data Insert Successful");
                }
            })
        })


        //  Delete Data---------------------------------
        app.delete('/delete/:id', function (req, res) {
            const taskId = req.params.id;

            let deleteQuery = "DELETE FROM task WHERE id =" + taskId;

            conn.query(deleteQuery, (error) => {
                if (error) {
                    console.log("Data Delete Failed");
                    console.log(error);
                } else {
                    console.log("Data Delete Successful");
                }
            })

        })


        // Update Data---------------------------------
        app.put('/update', function (req, res) {
            dataUpdate(conn);
            res.send('Data Updated')
        })


        // Select Data---------------------------------
        app.get('/allTask', function (req, res) {
            let selectQuery = "SELECT * FROM `task`";

            conn.query(selectQuery, (error, result) => {
                if (error) {
                    console.log("Data Select Failed");
                    console.log(error);
                } else {
                    res.send(result)
                }
            })

        })
    }
})



// Data Insert Function
// const insertData = (conn) => {

//     let insertQuery = "INSERT INTO `task`(`title`, `date`, `duration`, `type`) VALUES ('Drive', '2022/02/06', '200', 'Learning')";

//     conn.query(insertQuery, (error) => {
//         if (error) {
//             console.log("Data Insert Failed");
//             console.log(error);
//         } else {
//             console.log("Data Insert Successful");
//         }
//     })
// }


// Data Delete Function
const dataDelete = (conn) => {

    // let deleteQuery = "DELETE FROM `task` WHERE `id`='5' ";

    // conn.query(deleteQuery, (error) => {
    //     if (error) {
    //         console.log("Data Delete Failed");
    //         console.log(error);
    //     } else {
    //         console.log("Data Delete Successful");
    //     }
    // })

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


// Select Data Function
// const dataSelect = (conn) => {

//     let selectQuery = "SELECT * FROM `task`";

//     conn.query(selectQuery, (error, result) => {
//         if (error) {
//             console.log("Data Select Failed");
//             console.log(error);
//         } else {
//             console.log(result);
//         }
//     })
// }







app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});