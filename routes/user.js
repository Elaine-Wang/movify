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

    console.log("Username: " + req.body.create_username)
    const username = req.body.create_username
    const password = req.body.create_password

    const connection = getConnection()

    const queryString = "INSERT INTO users (username, password) VALUES (?, ?)"
    connection.query(queryString, [username, password], (err, results, fields) => {
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
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b04a078ee0777f',
    password: '22fcc01e',
    database: 'heroku_de2493ad86ba222'
})

function getConnection() {
    return pool
}

module.exports = router