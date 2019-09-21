var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var db;
var url = "mongodb://localhost:27017"
var count = 0;
var counts = 0;
var count1= 0;
mongoClient.connect(url, function(err, client) {
    if (err) { throw err }
    db = client.db('projectdb');
});
// router.use(function(req, res, next) {
//     next();
// });
router.get('/', function(req, res) {
    res.render('signup');
});

router.post('/authsignup', function(req, res) {
    db.collection('user').find({}).toArray(function(err, result) {
       
                for(var i=0;i<result.length;i++)
                    {
                        for(var j=0;j<result.length;j++)
                        {
                        if(result[j].email == req.body.email)
                        {
                            count1++
                            res.render('signup',{message:"email already taken"})
                            break;
                        }
                        }
                        if(count1>0)
                        {
                            console.log(count1)
                            count1 =0;
                        break;
                        }
                        else{
                        if(result[i].username==req.body.username)
                        {
                            res.render("signup",{message1:"user name exists"})
                            break;
                        }
                        else{
                            counts ++;
                        }
                        }
                    }
                if(counts == result.length)
                    {
                        console.log(req.body.Cpassword)
                        if(req.body.password!=req.body.Cpassword){
                            res.render("signup",{message3:"password doesn't match"})
                            counts =0;
                        }
                        else{
                            console.log('entered')
                            db.collection("user").insertOne(req.body,function(err,result){
                                if(err){throw err}
                                console.log("inserted")
                                req.session.loggedIn=req.body;
                                res.redirect('/login');
                                counts =0;
                            })
                        }
                    }

    })
});

module.exports = router;