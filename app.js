const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const path = require('path');
//var mongodb = require("mongodb");
//var ObjectID = mongodb.ObjectID;
const mongoose = require('mongoose');


const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
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
const trends = require('./routes/trends.js')

app.use(movies)
app.use(users)
app.use(logs)
app.use(recommendations)
app.use(trends)

var db;

// Connect to the database before starting the application server.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.

    let db = mongoose.connection;

    db.once('open', () => console.log('connected to the database'));

    // checks if connection with the database is successful
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    // const PORT = process.env.PORT || 3003
    // app.listen(PORT, () => {
    //     console.log("Server is up and listening on: " + PORT)
    // })
});

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log("Server is up and listening on: " + PORT)
})

