"use strict";
var express = require('express');
var flash = require('connect-flash');
var session = require('express-session');
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
var client = mongodb.MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'testmovie';
var port = 4200;
var app = express();

// defining routes
var signup = require('./routes/signup');
var login = require('./routes/login');
var news = require('./routes/news');
var boxoffice = require('./routes/boxoffice');
var viewmovie = require('./routes/viewmovie');
var addreview = require('./routes/addreview');
var viewreviews = require('./routes/viewreview');
var myreviews = require('./routes/myreviews');

// connection to the db
client.connect(url, { useNewUrlParser: true }, function(err, client) {
    if (err)
        throw err;
    app.locals.db = client.db(dbName);
});

// middlewares
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "This is personalized secret session which is used to sign a cookie" }));
app.use(express.static(__dirname + '/public'));

// routes middleware
app.use('/signup', signup);
app.use('/login', login);
app.use('/', news);
app.use('/boxoffice', boxoffice);
app.use('/view', viewmovie);
app.use('/addreview', addreview);
app.use('/viewreviews', viewreviews);
app.use('/myreviews', myreviews);


// listening to the port
app.listen(port);