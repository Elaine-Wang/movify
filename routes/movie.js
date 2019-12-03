// contains all movie related routes
const express = require("express")
const mysql = require("mysql")
const router = express.Router()

// CREATE 
router.post('/movie_create', (req, res) => {
    console.log("Trying to create a new movie...")

    console.log("movie_title: " + req.body.create_movie_title)
    const movie_title = req.body.create_movie_title
    const movie_imdb_link = req.body.create_movie_imdb_link
    const director_name = req.body.create_director_name
    const imdb_score = req.body.create_imdb_score
    const actor_1_name = req.body.create_actor_1_name
    const actor_2_name = req.body.create_actor_2_name
    const actor_3_name = req.body.create_actor_3_name
    const genres = req.body.create_genres
    const duration = req.body.create_duration
    const language = req.body.create_language
    const plot_keywords = req.body.create_plot_keywords
    const country = req.body.create_country
    const budget = req.body.create_budget
    const title_year = req.body.create_title_year
    const gross = req.body.create_gross
    const content_rating = req.body.create_content_rating

    const connection = getConnection()

    const queryString = "INSERT INTO movies (movie_title, movie_imdb_link, director_name, imdb_score, actor_1_name, actor_2_name, actor_3_name, genres, duration, language, plot_keywords, country, budget, title_year, gross, content_rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    connection.query(queryString, [movie_title, movie_imdb_link, director_name, imdb_score, actor_1_name, actor_2_name, actor_3_name, genres, duration, language, plot_keywords, country, budget, title_year, gross, content_rating], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new movie: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new movie with id: ", results.insertId)
        res.end()
    })

    res.end()
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

router.get('/movie/:movie_title', (req, res) => {
    console.log("Fetching movie with title: " + req.params.movie_title)

    const connection = getConnection()

    const movieTitle = req.params.movie_title
    const queryString = "SELECT * FROM movies WHERE movies.movie_title LIKE %?%"
    connection.query(queryString, [movieTitle], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for movies: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Fetched movies successfully")
        res.json(rows)
    })
})

// UPDATE
router.post('/movie_update', (req, res) => {
    console.log("Trying to update a movie...")

    console.log("movie_title: " + req.body.update_orig_movie_title)
    const new_movie_title = req.body.update_new_movie_title
    const movie_imdb_link = req.body.update_movie_imdb_link
    const director_name = req.body.update_director_name
    const imdb_score = req.body.update_imdb_score
    const actor_1_name = req.body.update_actor_1_name
    const actor_2_name = req.body.update_actor_2_name
    const actor_3_name = req.body.update_actor_3_name
    const genres = req.body.update_genres
    const duration = req.body.update_duration
    const language = req.body.update_language
    const plot_keywords = req.body.update_plot_keywords
    const country = req.body.update_country
    const budget = req.body.update_budget
    const title_year = req.body.update_title_year
    const gross = req.body.update_gross
    const content_rating = req.body.update_content_rating
    const orig_movie_title = req.body.update_orig_movie_title

    const connection = getConnection()

    const queryString = "UPDATE movies SET movie_title = ?, movie_imdb_link = ?, director_name = ?, imdb_score = ?, actor_1_name = ?, actor_2_name = ?, actor_3_name = ?, genres = ?, duration = ?, language = ?, plot_keywords = ?, country = ?, budget = ?, title_year = ?, gross = ?, content_rating = ? WHERE movies.movie_title = ?"
    connection.query(queryString, [new_movie_title, movie_imdb_link, director_name, imdb_score, actor_1_name, actor_2_name, actor_3_name, genres, duration, language, plot_keywords, country, budget, title_year, gross, content_rating, orig_movie_title], (err, results, fields) => {
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

    console.log("movie_title: " + req.body.delete_movie_title)
    const movie_title = req.body.delete_movie_title

    const connection = getConnection()

    const queryString = "DELETE FROM movies WHERE movies.movie_title = ?"
    connection.query(queryString, [movie_title], (err, results, fields) => {
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