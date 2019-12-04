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
// const trends = require('./routes/trends.js')

const dbRoute = 'mongodb://heroku_nmhhktbj:h62h6n86lhb84iokc6qapdknik@ds351628.mlab.com:51628/heroku_nmhhktbj';

// Connect to the database before starting the application server.
mongoose.connect(dbRoute, function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        let db = mongoose.connection;
        db.once('open', () => console.log('connected to the database'));

        app.get('/trend_get', (req, res) => {
            var mapFunc = function () {
                for (var idx1 = 0; idx1 < this.keywords.length; idx1++) {
                    for (var idx2 = idx1 + 1; idx2 < this.keywords.length; idx2++) {
                        emit(this.keywords[idx1], this.keywords[idx2]);
                        emit(this.keywords[idx2], this.keywords[idx1]);
                    }
                }
            };

            var reduceFunc = function (keyKeywordId, keywords) {
                if (keywords.length === 0)
                    return -1;
                var modeMap = {};
                var maxEl = keywords[0], maxCount = 1;
                for (var i = 0; i < keywords.length; i++) {
                    var el = keywords[i];
                    if (modeMap[el] == null)
                        modeMap[el] = 1;
                    else
                        modeMap[el] += 1;
                    if (modeMap[el] === maxCount) {
                        if (el < maxEl) {
                            maxEl = el;
                        }
                    }
                    if (modeMap[el] > maxCount) {
                        maxEl = el;
                        maxCount = modeMap[el];
                    }
                }
                return maxEl;
            };

            var mapReduceRes = db.keywords.mapReduce(
                mapFunc,
                reduceFunc,
                { out: "times" }
            );

            var updateRes = db.times.update({}, { $rename: { "value": "keywordPair" } }, false, true)
            db.times.find().toArray(function (err, docs) {
                if (err) {
                    handleError(res, err.message, "Failed to get trends.");
                } else {
                    res.json(docs);
                }
            });;
        })
    }

    // // checks if connection with the database is successful
    // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});

app.use(movies)
app.use(users)
app.use(logs)
app.use(recommendations)
// app.use(trends)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log("Server is up and listening on: " + PORT)
})

