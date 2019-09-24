"use strict";
var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
var router = express.Router();
// middleware for boxoffice
router.use(function(req, res, next) {
    if (!req.session.loggedIn)
        res.redirect('/login');
    else {
        next();
    }

});

// movie API & key
var movie_api = process.env.MOVIE_API;
var movie_key = process.env.MOVIE_API_KEY;


// get request for search
router.get('/', function(req, res) {
    res.render('search.hbs', { style: '../../styles/search.css', title: 'Flickster Movie', script: '../../scripts/search.js', movie_API: JSON.stringify(movie_api), movie_key: JSON.stringify(movie_key), search: 'active', li: 'margin-left: 500px;' });

});


module.exports = router;