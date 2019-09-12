var express = require('express');
var router = express.Router();

router.get("/movieReview/:mymovieId", function(req, res)
{  
         console.log(req.params); 
        db.collection('reviews')
        .find( {"Review.movieID" : req.params.mymovieId})
        .toArray(function(error, result){
            if(error) throw error;
            // res.json(result);
            res.render("review.hbs",{
                data: result,
                title: "review"                    
            });
            
        });
   
});

module.exports = router;