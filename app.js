const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');


const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'client/build')))
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

// const dbRoute = 'mongodb://heroku_nmhhktbj:h62h6n86lhb84iokc6qapdknik@ds351628.mlab.com:51628/heroku_nmhhktbj';
// mongoose.connect(dbRoute, err => {
//     console.log(err)
// });
// let db = mongoose.connection

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

    const PORT = process.env.PORT || 3003
    app.listen(PORT, () => {
        console.log("Server is up and listening on: " + PORT)
    })
})

module.exports = db;
