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