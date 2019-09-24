"use strict";
var express = require('express');
var router = express.Router();

// view reviews for a particular user
router.get('/', function(req, res) {
    var db = req.app.locals.db;
    db.collection('userreview').find({ movieID: req.query.movieID }).toArray(function(err, result) {
        if (err)
            throw err;
        if (result)
            res.json(result);
    });

});

module.exports = router;