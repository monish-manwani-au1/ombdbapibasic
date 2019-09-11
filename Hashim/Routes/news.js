var express = require('express');
var router = express.Router();
var request = require('request');
router.get('/', function(req, res) {
    request('https://newsapi.org/v2/top-headlines?' + 'category=entertainment&' + 'country=in&' +
        'apiKey=6271186d692d4e10873d2ea2ccbc0680', { json: true },
        function(error, response, body) {
            console.log('error:', error);
            console.log(body.articles)
            res.render('landing', { articles: body })
        })
})
module.exports = router;