"use strict";
var express = require('express');
var router = express.Router();
router.use(function(req, res, next) {
    if (!req.session.loggedIn)
        res.redirect('/login');
    else {
        next();
    }

});
router.get('/', function(req, res) {
    res.render('search.hbs', { style: '../../styles/search.css', title: 'Flickster Movie', script: '../../scripts/search.js', search: 'active', li: 'margin-left: 713px;' });

});

module.exports = router;