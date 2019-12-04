// contains all movie related routes
const express = require("express")
const mysql = require("mysql")
const router = express.Router()

// CREATE 
router.post('/user_like', (req, res) => {
    const username = req.body.username
    const title = req.body.title
    const id = req.body.id
    const genre = req.body.genre

    const connection = getConnection()

    const queryString = "INSERT IGNORE INTO users (username, title, id, genre) VALUES (?, ?, ?, ?)"
    connection.query(queryString, [username, title, id, genre], (err, results, fields) => {
        if (err) {
            console.log("Failed to like a movie: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Liked a new movie with id: ", results.insertId)
        res.send()
    })

    res.send()
})

// // READ
// router.get("/movies", (req, res) => {
//     const connection = getConnection()
//     const queryString = "SELECT * FROM movies"
//     connection.query(queryString, (err, rows, fields) => {
//         if (err) {
//             console.log("Failed to query for movies: " + err)
//             res.sendStatus(500)
//             return
//         }

//         console.log("Fetched movies successfully")
//         res.json(rows)
//     })
// })

// router.get('/movie/:title', (req, res) => {
//     console.log("Fetching movie with title: " + req.params.title)

//     const connection = getConnection()

//     const movieTitle = req.params.title
//     const queryString = "SELECT * FROM movies WHERE LOWER(movies.title) LIKE LOWER(\"%\"?\"%\")"
//     connection.query(queryString, [movieTitle], (err, rows, fields) => {
//         console.log(queryString)
//         if (err) {
//             console.log("Failed to query for movies: " + err)
//             res.sendStatus(500)
//             return
//         }

//         console.log("Fetched movies successfully")
//         res.json(rows)
//     })
// })

// DELETE
router.post('/user_dislike', (req, res) => {
    const username = req.body.username
    const id = req.body.id

    const connection = getConnection()

    const queryString = "DELETE FROM users WHERE users.username = ? AND users.id = ?"
    connection.query(queryString, [username, id], (err, results, fields) => {
        if (err) {
            console.log("Failed to dislike a movie: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Disliked a movie with id: ", results.deleteId)
        res.end()
    })

    res.end()
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-mm-dca-648e9a121678.g5.cleardb.net',
    user: 'b04a078ee0777f',
    password: '22fcc01e',
    database: 'heroku_de2493ad86ba222'
})

function getConnection() {
    return pool
}

module.exports = router