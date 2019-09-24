"use strict";
var express = require('express');
var router = express.Router();

// add the review of an user to the movie

router.post('/addreview', function(req, res) {
    var db = req.app.locals.db;
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        var flag = false;
        db.collection('userreview').findOne({ movieID: req.body.movieID, username: req.session.user }, function(err, found) {
            if (err)
                throw err;
            if (found) {
                res.json({ warning: "Warning!!!!!You have already rated this movie!!" });

            } else {
                req.body.username = req.session.user;
                db.collection('userreview').insertOne(req.body, function(err, result) {
                    if (err)
                        throw err;
                    if (result) {
                        res.json({ success: "Submitted successfully" });
                    }
                })
            }
        });
    }
});

module.exports = router;