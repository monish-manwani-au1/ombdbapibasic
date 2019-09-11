var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var db;
var url = "mongodb://localhost:27017"
var count = 0;
var counts = 0;
mongoClient.connect(url, function(err, client) {
    if (err) { throw err }
    db = client.db('MovieDB');
});
// router.use(function(req, res, next) {
//     next();
// });
router.get('/', function(req, res) {
    res.render('signup.handlebars');
});

router.post('/authsignup', function(req, res) {
    db.collection('user').find({}).toArray(function(err, result) {
        for (var i = 0; i < result.length; i++) {
            if (result[i].email != req.body.email) {
                if (result[i].username != req.body.username) {
                    counts++;
                } else {
                    res.render("signup", { message1: "username already taken" })
                    break;
                }
            } else {
                res.render("signup", { message: "email has alredy been used" })
                break;
            }
        }
        if (counts == result.length) {
            console.log(req.body.Cpassword)
            if (req.body.password == req.body.Cpassword) {
                console.log('entered')
                db.collection("user").insertOne(req.body, function(err, result) {
                    if (err) { throw err }
                    console.log("inserted")
                    req.session.loggedIn = req.body;
                    res.render('mainpage');
                    counts = 0;
                })
            } else {
                res.render("signup", { message3: "password doesn't match" })
                counts = 0;
            }

        } else {
            console.log('cdcmdc');
        }

    })
});

module.exports = router;