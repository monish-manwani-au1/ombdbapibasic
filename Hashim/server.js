var express = require('express');
var exhbs = require("express-handlebars");
var bodyparser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');
var app = express();
var login = require('./Routes/login');
var signup = require('./Routes/signup');
var news = require('./Routes/news');
//app.use(upload.array());
app.use(cookieParser());
app.use(session({ secret: "Your secret key" }));

app.engine('handlebars', exhbs());
app.set('view engine', 'handlebars');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use('/login', login);
app.use('/signup', signup);
app.use('/news', news);


/*app.get('/',function(req,res){
    res.render('landing.handlebars',{script:"youtube.js",script2 : "news.js"});
})
/*app.get('/login',function(req,res){
    res.render('login.handlebars')
})

app.post('/login',function(req,res){
    console.log(req.body)
    db.collection("user").find({}).toArray(function(err,result){
        if(err){console.log(err)}
        console.log(result[1].username)
        for(var i=0;i<result.length;i++){
            if(result[i].username == req.body.username&&result[i].password == req.body.password)
          {
            res.redirect('/mainpage');
        }
          }
          res.render("mainpage.handlebars",{message:"Ivalid Credentials"});
    })
})
   
app.get('/signup',function(req,res){
    res.render('signup.handlebars')
})
app.post('/signup',function(req,res){
    console.log(req.body)
    db.collection("user").insertOne(req.body,function(err,result){
        if(err){throw err}
        console.log("inserted")
        req.session.loggedIn=true;
    })
     res.render("mainpage.handlebars",{Id:req.body.username});
})
app.get('/mainpage',function(req,res){
    res.render("mainpage.handlebars",{Id:req.body.username});

})

app.listen("3000",function(){
    console.log("running on 3000")
})


/*db.collection("user").find({},).toArray(function(err,result){
    if(err){err}
    else{
        for(i=0;i<result.length;i++){
            if(req.body.username==result[i].username){
                for(var j=0;j<result[i].review.length;j++)
                {
                    if(req.body.movieID==result[i].review[j].movieID)
                    {
                        console.log("found");
                    }
                    db.collection("user").insertOne(req.body,function(err,res){
                        if(err){err}
                        console.log(result);
                        break;
                    })
                }
            }
        }
       
    }
})
})*/

/*app.get('/',function(req,res){
        request('https://newsapi.org/v2/top-headlines?'+'category=entertainment&'+'country=in&'+
        'apiKey=6271186d692d4e10873d2ea2ccbc0680',{json:true},function(error,response,body){
            console.log('error:',error);
            console.log(body.articles)
            res.render('landing',{articles:body})
               })
    })

app.get('/signup', function(req, res){
    res.render('signup');
 });
 
 app.post('/signup', function(req, res){
       db.collection('user').find({}).toArray(function(err,result){
        for(var i=0;i<result.length;i++)
        {
            if(result[i].email != req.body.email)
            {
              if(result[i].username != req.body.username)
              {
              counts++;
              }
              else{
              res.render("signup",{message1:"username already taken"})
              break;
              }
            }
            else{
            res.render("signup",{message:"email has alredy been used"})
            break;
            }
        }
      if(counts == result.length)
         {    
             console.log(req.body.Cpassword)
             if(req.body.password==req.body.Cpassword){
                 console.log('entered')
                db.collection("user").insertOne(req.body,function(err,result){
                    if(err){throw err}
                    console.log("inserted")
                    req.session.loggedIn=req.body;
                    res.redirect('/mainpage');
                    counts =0;
                }) 
             }
             else{
                 res.render("signup",{message3:"password doesn't match"})
                 counts =0;
             }
         
         }		  
             
    })
  })


        function checkSignIn(req, res,next){
    if(req.session.loggedIn){
       next();     //If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  //Error, trying to access unauthorized page!
    }
 }
 app.get('/mainpage',checkSignIn, function(req, res){
    res.render("mainpage", {Id: req.session.loggedIn.username})
 });
 
 app.get('/login', function(req, res){
    res.render('login');
 });
 
 app.post('/login', function(req, res){
    db.collection("user").find({}).toArray(function(err,result){
        if(err){console.log(err)}
        console.log(result[1].username)
        for(var i=0;i<result.length;i++){

            if(result[i].username == req.body.username&&result[i].password == req.body.password)
          {
              count++;
          }
        }
          if(count==1) {
            req.session.loggedIn=req.body;
            console.log(req.session.loggedIn)
          res.redirect('/mainpage');
          count =0;
          }   
        else{
            res.render('login',{message:"username or password is incorrect"});
        }
          })
    });*/

app.get('/logout', function(req, res) {
    req.session.destroy(function() {
        console.log("user logged out.")
    });
    res.render("login");
});

/*app.use('/mainpage', function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});*/

app.listen("3000", function() {
    console.log("running on 3000")
});