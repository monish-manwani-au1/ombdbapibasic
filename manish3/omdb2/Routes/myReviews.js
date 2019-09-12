var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;



router.get("/myReviews", function(req, res)
{  
    if(req.session.loggedIn == true){
        db.collection('reviews')
        .find( {"email" : req.session.email})
        .toArray(function(error, result){
            if(error) throw error;
            // res.json(result);
            res.render("myReviews.hbs",{
                data: result,
                scriptData:JSON.stringify(result),
                style: "omdb.css",
                title: "myReviews",
                script: "/delete.js"

            });        
            
        });
    }else{
        res.redirect("/");
    }
   
});

// edit button

router.put('/myreviews/edit',function(req,res){
    console.log(req.query.id);
    console.log(req.body.Review);
    db.collection('reviews').updateOne({_id:ObjectId(req.query.id)},{$set:{'Review.review' : req.body.Review}},function(err,result){
        if(err)
        throw err;
        if(result)
        // res.json({"success":"Updated successfully"});
        res.json(result);
    })
})


router.delete('/myReviews/delete/:id', function(req, res) {
    db.collection('reviews').deleteOne({ _id: ObjectId(req.params.id) }, function(err, result) {
        if (err)
            throw err;
        if (result)
            res.json(result);
    });

});



module.exports = router;