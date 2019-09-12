var express = require('express');
var router = express.Router();

router.get("/search", function(req, res){
    if(req.session.loggedIn == true){
        res.render("omdb",{
            title: "omdb search",
            style: "omdb.css",
            script: "/main.js"
            
        });
    }else{
        res.redirect("/");
    }
});

module.exports = router;