const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const path = require('path');

const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'client/build')))
//app.use(express.static('./public')) honk
app.use(morgan('short'))

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOT")
})

const movies = require('./routes/movie.js')
const users = require('./routes/user.js')
const logs = require('./routes/log.js')
const recommendations = require('./routes/recommendation.js')

app.use(movies)
app.use(users)
app.use(logs)
app.use(recommendations)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log("Server is up and listening on: " + PORT)
})

