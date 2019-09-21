"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
router.get('/', function(req, res) {
    request('https://newsapi.org/v2/top-headlines?' + 'category=entertainment&' + 'country=in&' +
        'apiKey=6271186d692d4e10873d2ea2ccbc0680', { json: true },
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
                res.render('news.hbs', { articles: body, news: 'active', script: '../../scripts/search.js', li: 'margin-left: 713px;', style: '../../styles/news.css', title: 'Flickster News' });
            }
        })
});

// logout
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;