"use strict";
var express = require('express');
var router = express.Router();
// Signup Page
router.get('/', function(req, res) {
    if (!req.session.loggedIn) {
        res.render('signup.hbs', { style: '../../styles/sign.css', title: 'Sign-up', script: '../../scripts/search.js', signup: 'active', li: 'pointer-events:none;display:none;' });
    } else {
        res.redirect('/');
    }

});

// signup Authentication
router.post('/signauth', function(req, res) {
    var db = req.app.locals.db;
    if (req.body.confirm_password != req.body.password) {
        res.render('signup.hbs', { style: '../../styles/sign.css', title: 'Sign-up', script: '../../scripts/search.js', alert: 'Passwords Does not Matches', li: 'pointer-events:none;display:none;' });
    } else {
        if (!req.session.loggedIn) {
            var flag = true;
            db.collection('users').find({}).toArray(function(err, result) {
                for (var i = 0, n = result.length; i < n; i++) {
                    if (req.body.username == result[i].username || req.body.email == result[i].email) {
                        flag = false;
                        res.render('signup.hbs', { style: '../../styles/sign.css', title: 'Sign-up', script: '../../scripts/search.js', alert: 'Username or Email already Taken', li: 'pointer-events:none;display:none;' });
                        break;
                    }
                }
                if (flag) {
                    db.collection('users').insertOne(req.body, function(err, result) {
                        if (err)
                            throw err;
                        if (result) {
                            res.redirect('/login');
                        }
                    })
                }

            });
        } else {
            res.redirect('/');
        }
    }
});

module.exports = router;