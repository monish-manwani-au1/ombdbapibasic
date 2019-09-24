"use strict";
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

// middleware
router.use(function(req, res, next) {
    if (!req.session.loggedIn)
        res.redirect('/login');
    else {
        next();
    }

});

// my reviews of an user
router.get('/', function(req, res) {
    var db = req.app.locals.db;
    db.collection('userreview').find({ username: req.session.user }).toArray(function(err, result) {
        if (err)
            throw err;
        if (result) {
            res.render('myreview.hbs', { style: '../../styles/myreview.css', data: result, reponseData: JSON.stringify(result), title: 'Flickster-Myreviews', myreviews: 'active', script: '../../scripts/search.js', li: 'margin-left: 500px;' });
        }
    });
});


// An user can edit the review

router.put('/editreview', function(req, res) {
    var db = req.app.locals.db;
    db.collection('userreview').updateOne({ _id: ObjectID(req.query.id) }, { $set: { review: req.body.review } }, function(err, result) {
        if (err)
            throw err;
        if (result)
            res.json({ success: "Successfully Inserted" });
    })
});

// An user can delete their review
router.delete('/deletereview/:id', function(req, res) {
    var db = req.app.locals.db;
    db.collection('userreview').deleteOne({ _id: ObjectID(req.params.id) }, function(err, result) {
        if (err)
            throw err;
        if (result)
            res.json({ success: "Deleted Successfully" });
    });
});

module.exports = router;