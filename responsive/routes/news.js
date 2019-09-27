"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var dotenv = require('dotenv');
dotenv.config();


// news in home page.
router.get('/', function(req, res) {
    var key = process.env.NEWS_API + process.env.NEWS_API_KEY;
    request(key, { json: true },
        function(error, response, body) {
            if (!req.session.loggedIn) {
                res.render('news.hbs', {
                    articles: body,
                    news: 'active',
                    script: '../../scripts/search.js',
                    li: 'pointer-events:none;display:none;',
                    title: 'Flickster News',
                    style: '../../styles/news.css'
                });
            } else if (req.session.loggedIn) {
                res.render('news.hbs', { articles: body, news: 'active', script: '../../scripts/search.js', li: 'margin-left: 500px;', style: '../../styles/news.css', title: 'Flickster News' });
            }
        })
});

// logout
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;