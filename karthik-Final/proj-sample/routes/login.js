"use strict";
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (!req.session.loggedIn) {
        res.render('login.hbs', { style: '../../styles/login.css', title: 'Login', script: '../../scripts/search.js', login: 'active', li: 'pointer-events:none;display:none;' });
    } else {
        res.redirect('/');
    }

});
router.post('/login', function(req, res) {
    var db = req.app.locals.db;
    db.collection('users').findOne({ email: req.body.email, password: req.body.password }, function(err, result) {
        if (err)
            throw err;
        if (result) {
            req.session.loggedIn = true;
            req.session.user = result.username;
        } else {
            req.session.loggedIn = false;
        }
        if (!req.session.loggedIn) {
            res.render('login.hbs', { alert: "Invalid Credentials", style: '../../styles/login.css', title: 'Login', script: '../../scripts/search.js', login: 'active', li: 'pointer-events:none;display:none;' });
        } else {
            res.redirect('/boxoffice');
        }
    });
});
module.exports = router;