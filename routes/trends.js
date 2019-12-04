// // contains all movie related routes
// const express = require("express")
// // var mongodb = require("mongodb")
// const router = express.Router()

// router.get('/trend_get', (req, res) => {
//     var mapFunc = function () {
//         for (var idx1 = 0; idx1 < this.keywords.length; idx1++) {
//             for (var idx2 = idx1 + 1; idx2 < this.keywords.length; idx2++) {
//                 emit(this.keywords[idx1], this.keywords[idx2]);
//                 emit(this.keywords[idx2], this.keywords[idx1]);
//             }
//         }
//     };

//     var reduceFunc = function (keyKeywordId, keywords) {
//         if (keywords.length === 0)
//             return -1;
//         var modeMap = {};
//         var maxEl = keywords[0], maxCount = 1;
//         for (var i = 0; i < keywords.length; i++) {
//             var el = keywords[i];
//             if (modeMap[el] == null)
//                 modeMap[el] = 1;
//             else
//                 modeMap[el] += 1;
//             if (modeMap[el] === maxCount) {
//                 if (el < maxEl) {
//                     maxEl = el;
//                 }
//             }
//             if (modeMap[el] > maxCount) {
//                 maxEl = el;
//                 maxCount = modeMap[el];
//             }
//         }
//         return maxEl;
//     };

//     var mapReduceRes = heroku_nmhhktbj.keywords.mapReduce(
//         mapFunc,
//         reduceFunc,
//         { out: "times" }
//     );
    
//     var updateRes = heroku_nmhhktbj.times.update({}, { $rename: { "value": "keywordPair" } }, false, true)
//     heroku_nmhhktbj.times.find().toArray(function(err, docs) {
//         if (err) {
//           handleError(res, err.message, "Failed to get trends.");
//         } else {
//           res.json(docs);
//         }
//       });;
// })

// // const pool = mongodb.createPool({
// //     connectionLimit: 10,
// //     host: 'us-mm-dca-648e9a121678.g5.cleardb.net',
// //     user: 'heroku_nmhhktbj',
// //     password: 'h62h6n86lhb84iokc6qapdknik',
// //     database: 'heroku_de2493ad86ba222'
// // })

// // function getConnection() {
// //     return pool
// // }

// module.exports = router