var express = require('express');
var router = express.Router();

router.get("/movieInfo", function(req, res){
    if(req.session.loggedIn == true){
        res.render("movie",{
            title: "omdb search info",
            style: "./omdb.css"
        //    script: "/main.js"
        
            
        });
    }else{
        res.redirect("/");
    }
});


router.get("/movieInfo/add", function(req, res){
    if(req.session.loggedIn == true){
        res.render("movie",{
            title: "add review"
         //   script: "/main.js"
        
            
        });
    }else{
        res.redirect("/");
    }
});

router.post('/user/reviewData', function(req, res){
    //  var comment= req.body;
  
          db.collection('reviews').insertOne(  { 'email':req.session.email, 'Review':req.body }, function(err, result){
              if(err) throw err;
              console.log(req.body);
              res.send('/success');
          });
        });

module.exports = router;