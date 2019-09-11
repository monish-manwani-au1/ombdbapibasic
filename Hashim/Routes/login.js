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
//Main Page Route
router.get('/mainpage', checkSignIn, function(req, res) {
    res.render("mainpage", { Id: req.session.loggedIn.username })
});

function checkSignIn(req, res, next) {
    if (req.session.loggedIn) {
        next(); //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err); //Error, trying to access unauthorized page!
    }
}

router.use('/mainpage', function(err, req, res, next) {
    console.log(err);
    //User should be authenticated! Redirect him to log in.
    res.redirect('/login');
});

//Login Route
router.get('/', function(req, res) {
    res.render('login');
});

router.post('/loginauth', function(req, res) {
    db.collection("user").find({}).toArray(function(err, result) {
        if (err) { console.log(err) }
        console.log(result[1].username)
        for (var i = 0; i < result.length; i++) {

            if (result[i].username == req.body.username && result[i].password == req.body.password) {
                count++;
            }
        }
        if (count == 1) {
            req.session.loggedIn = req.body;
            console.log(req.session.loggedIn)
            res.redirect('./mainpage');
            count = 0;
        } else {
            res.render('login', { message: "username or password is incorrect" });
        }
    })
});

module.exports = router;