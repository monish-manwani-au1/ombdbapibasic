var express = require('express');
var router = express.Router();

router.post('/login', function(req, res){
    db.collection('user').find().toArray(function(error, result){
        if (error)
            throw error;
        for(var i=0; i < result.length; i++){
            if(
                req.body.email == result[i].email &&
                req.body.password == result[i].password
            ){
                req.session.loggedIn = true;
                req.session.username = result[i].username;
                req.session.email = result[i].email;
            }
        }//loopEnds
        res.redirect('/moviedbs/search')
    });
});


module.exports = router;