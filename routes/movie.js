// contains all movie related routes
const express = require("express")
const mysql = require("mysql")
const router = express.Router()

// CREATE 
router.post('/movie_create', (req, res) => {
    console.log("Trying to create a new movie...")

    console.log("title: " + req.body.title)
    const title = req.body.title
    const original_language = req.body.original_language
    const overview = req.body.overview

    const connection = getConnection()

    const queryString = "INSERT INTO movies (title, original_language, overview) VALUES (?, ?, ?)"
    connection.query(queryString, [title, original_language, overview], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new movie: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new movie with id: ", results.insertId)
        res.send()
    })

    res.send()
})

// READ
router.get("/movies", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM movies"
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for movies: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Fetched movies successfully")
        res.json(rows)
    })
})

router.get('/movie/:title', (req, res) => {
    console.log("Fetching movie with title: " + req.params.title)

    const connection = getConnection()

    const movieTitle = req.params.title
    const queryString = "SELECT * FROM movies WHERE LOWER(movies.title) LIKE LOWER(\"%\"?\"%\")"
    connection.query(queryString, [movieTitle], (err, rows, fields) => {
        console.log(queryString)
        if (err) {
            console.log("Failed to query for movies: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Fetched movies successfully")
        res.json(rows)
    })
})

router.get('/gallery/:genre', (req, res) => {
    console.log("Fetching movie with genre: " + req.params.genre)

    const connection = getConnection()

    const movieGenre = req.params.genre
    console.log(movieGenre)
    const queryString = "SELECT * FROM movies WHERE movies.genre_ids0 = ? OR movies.genre_ids1 = ? OR movies.genre_ids2 = ? OR movies.genre_ids3 = ? OR movies.genre_ids4 = ? OR movies.genre_ids5 = ?"
    console.log(queryString)
    connection.query(queryString, [movieGenre, movieGenre, movieGenre, movieGenre, movieGenre, movieGenre], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for movie genres: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Fetched movie genres successfully")
        res.json(rows)
    })
})

// UPDATE
router.post('/movie_update', (req, res) => {
    console.log("Trying to update a movie...")

    console.log("movie_title: " + req.body.orig_title)
    const orig_title = req.body.orig_title
    const new_title = req.body.new_title
    const original_language = req.body.original_language
    const overview = req.body.overview

    const connection = getConnection()

    const queryString = "UPDATE movies SET title = ?, original_language = ?, overview = ? WHERE movies.title = ?"
    connection.query(queryString, [new_title, original_language, overview, orig_title], (err, results, fields) => {
        if (err) {
            console.log("Failed to update movie: " + err)
            res.sendStatus(500)
            return
        }

        res.end()
    })

    res.end()
})

// DELETE
router.post('/movie_delete', (req, res) => {
    console.log("Trying to delete a movie...")

    console.log("title: " + req.body.title)
    const title = req.body.title

    const connection = getConnection()

    const queryString = "DELETE FROM movies WHERE movies.title = ?"
    connection.query(queryString, [title], (err, results, fields) => {
        if (err) {
            console.log("Failed to delete movie: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Deleted a movie with id: ", results.deleteId)
        res.end()
    })

    res.end()
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