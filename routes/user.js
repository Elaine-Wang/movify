// contains all user related routes
const express = require("express")
const mysql = require("mysql")
const router = express.Router()

router.get("/users", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

router.post('/user_create', (req, res) => {
    console.log("Trying to create a new user...")

    console.log("First name: " + req.body.create_first_name)
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    const connection = getConnection()

    const queryString = "INSERT INTP users {first_name, last_name} VALUES (?, ?)"
    connection.query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user with id: ", results.insertId)
        res.end()
    })

    res.end()
})

router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            return
        }

        console.log("I think we fetched users successfully")

        // custom formatting for json responses:
        // const users = rows.map((row) => {
        //     return {firstName: row.first_name, lastName: row.last_name}
        // })

        res.json(rows)
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'db_name'
})

function getConnection() {
    return pool
}


module.exports = router