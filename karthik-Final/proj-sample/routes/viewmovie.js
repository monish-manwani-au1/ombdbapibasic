"use strict";
var express = require('express');
var router = express.Router();

router.get('/:movieId', function(req, res) {
    var movieId = req.params;
    res.render('view.hbs', { style: '../../styles/style.css', title: 'Flickstermovie-Details', search: 'active', data: JSON.stringify(movieId), li: 'margin-left: 713px;', script: '../../scripts/movie-view.js' });
});

module.exports = router;