"use strict";
var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
var router = express.Router();

router.use(function(req, res, next) {
    if (!req.session.loggedIn)
        res.redirect('/');
    else {
        next();
    }

});

// movie API & key
var movie_api = process.env.MOVIE_API;
var movie_key = process.env.MOVIE_API_KEY;

// View the details for a particular movie

router.get('/:movieId', function(req, res) {
    var movieId = req.params;
    res.render('view.hbs', { style: '../../styles/style.css', title: 'Flickstermovie-Details', search: 'active', data: JSON.stringify(movieId), movie_key: JSON.stringify(movie_key), movie_API: JSON.stringify(movie_api), li: 'margin-left: 500px;', script: '../../scripts/movie-view.js' });
});

module.exports = router;