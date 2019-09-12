var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var session = require('express-session');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;

//Modules
var search = require("./Routes/search.js");
var movieInfo = require("./Routes/movieInfo.js");
var viewReview = require("./Routes/viewReview.js");
var myReviews = require("./Routes/myReviews.js");
var login = require("./Routes/login.js");

var login = require('./Routes/login.js');
var signup = require('./Routes/signup.js');
var news = require('./Routes/news.js');


var app = express();

app.use(bodyParser.json());


app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs"}));
app.set("view engine", "hbs");


var url = 'mongodb://localhost:27017';

mongoClient.connect(url, {useNewUrlParser: true}, function(error, client){
    if(error)
        throw error;
    db = client.db('projectdb');    
});

app.use(session({
    secret : "express session "
}));

app.use(express.urlencoded({extended : false}));

app.use(express.static("public"));

//router use
app.use('/moviedbs', search);
app.use('/moviedbmi', movieInfo);
app.use('/moviedbvr', viewReview);
app.use('/moviedbmr', myReviews);
//app.use('/', login);

app.use('/login', login);
app.use('/signup', signup);
app.use('/', news);

//
// app.post('/login', function(req, res){
//     db.collection('user').find().toArray(function(error, result){
//         if (error)
//             throw error;
//         for(var i=0; i < result.length; i++){
//             if(
//                 req.body.email == result[i].email &&
//                 req.body.password == result[i].password
//             ){
//                 req.session.loggedIn = true;
//                 req.session.username = result[i].username;
//                 req.session.email = result[i].email;
//             }
//         }//loopEnds
//         res.redirect('/search')
//     });
// });


// app.get("/search", function(req, res){
//     if(req.session.loggedIn == true){
//         res.render("omdb",{
//             title: "omdb search",
//             style: "omdb.css",
//             script: "/main.js"
            
//         });
//     }else{
//         res.redirect("/");
//     }
// });




// app.get("/movieInfo", function(req, res){
//     if(req.session.loggedIn == true){
//         res.render("movie",{
//             title: "omdb search info",
//             style: "omdb.css"
//         //    script: "/main.js"
        
            
//         });
//     }else{
//         res.redirect("/");
//     }
// });


// app.get("/movieInfo/add", function(req, res){
//     if(req.session.loggedIn == true){
//         res.render("movie",{
//             title: "add review"
//          //   script: "/main.js"
        
            
//         });
//     }else{
//         res.redirect("/");
//     }
// });
// //post request to save review data in DB
// app.post('/user/reviewData', function(req, res){
//   //  var comment= req.body;

//         db.collection('reviews').insertOne(  { 'email':req.session.email, 'Review':req.body }, function(err, result){
//             if(err) throw err;
//             console.log(req.body);
//             res.send('/success');
//         });
//       });

    

//view review button onclick
// app.get("/movieReview/:mymovieId", function(req, res)
// {  
//          console.log(req.params); 
//         db.collection('reviews')
//         .find( {"Review.movieID" : req.params.mymovieId})
//         .toArray(function(error, result){
//             if(error) throw error;
//             // res.json(result);
//             res.render("review.hbs",{
//                 data: result,
//                 title: "review"                    
//             });
            
//         });
   
// });

// app.get("/myReviews", function(req, res)
// {  
//     if(req.session.loggedIn == true){
//         db.collection('reviews')
//         .find( {"email" : req.session.email})
//         .toArray(function(error, result){
//             if(error) throw error;
//             // res.json(result);
//             res.render("myReviews.hbs",{
//                 data: result,
//                 scriptData:JSON.stringify(result),
//                 style: "omdb.css",
//                 title: "myReviews",
//                 script: "/delete.js"

//             });        
            
//         });
//     }else{
//         res.redirect("/");
//     }
   
// });

// // edit button

// app.put('/myreviews/edit',function(req,res){
//     console.log(req.query.id);
//     console.log(req.body.Review);
//     db.collection('reviews').updateOne({_id:ObjectId(req.query.id)},{$set:{'Review.review' : req.body.Review}},function(err,result){
//         if(err)
//         throw err;
//         if(result)
//         // res.json({"success":"Updated successfully"});
//         res.json(result);
//     })
// })


// app.delete('/myReviews/delete/:id', function(req, res) {
//     db.collection('reviews').deleteOne({ _id: ObjectId(req.params.id) }, function(err, result) {
//         if (err)
//             throw err;
//         if (result)
//             res.json(result);
//     });

// });

app.listen(3000, function(req, res){
    console.log("listening on port 3000")
});


