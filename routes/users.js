const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated}= require('../config/auth');


//User model
const User = require('../models/User');
const { request } = require('express');

// Login Page
router.get('/login',(req,res)=>res.render('login', { login_info: req.isAuthenticated(), nav:'login',isError: false }));

// Register Page
router.get('/register',(req,res)=>res.render('register', { login_info: req.isAuthenticated(), nav:'register',isError: false }));

//Register Handle
router.post('/register',(req,res)=>{
    const { name, email, password, password2} = req.body
    let errors =[];

    //Check required fields
    if(!name || !email || !password || !password2 ){
        errors.push({msg:'Please fill al fields'});
    }

    //Check passwords match
    if(password!==password2){
        errors.push({msg:'Passwords do not match'});
    }

    //Check pass length
    if(password.length<6){
        errors.push({msg:'Password should be at least 6 characters'});
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2,
            isError: false,
            login_info: req.isAuthenticated(), 
            nav:'login'
        });
    }else{
        //Validation passed
        User.findOne({ email:email})
        .then(user =>{
            if(user){
                //User exists
                errors.push({ msg: 'Email is already registered'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    isError: false,
                    login_info: req.isAuthenticated(), 
                    nav:'login'
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //Weekly planner
                //creating Lists for week1
                const list1 = new LList({//Monday
                    name: email+"1",
                    items: defaultItems[0]
                  });
                  list1.save();

                  const list2 = new LList({//Tuesday
                    name: email+"2",
                    items: defaultItems[1]
                  });
                  list2.save();

                  const list3 = new LList({//Wednesday
                    name: email+"3",
                    items: defaultItems[2]
                  });
                  list3.save();
                  const list4 = new LList({//Thursday
                    name: email+"4",
                    items: defaultItems[0]
                  });
                  list4.save();
                  const list5 = new LList({//Friday
                    name: email+"5",
                    items: defaultItems[1]
                  });
                  list5.save();
                  const list6 = new LList({//Saturday
                    name: email+"6",
                    items: defaultItems[2]
                  });
                  list6.save();
                    //Recent completed plans (Achievement) | week1
                  const listD = new LList({
                    name: email+"weeklyDone",
                    
                  });
                  listD.save();



                  //creating Lists for week2
                const list12 = new LList({
                  name: email+"12",
                  items: defaultItems[0]
                });
                list12.save();

                const list22 = new LList({
                  name: email+"22",
                  items: defaultItems[1]
                });
                list22.save();

                const list32= new LList({
                  name: email+"32",
                  items: defaultItems[2]
                });
                list32.save();
                const list42 = new LList({
                  name: email+"42",
                  items: defaultItems[0]
                });
                list42.save();
                const list52 = new LList({
                  name: email+"52",
                  items: defaultItems[1]
                });
                list52.save();
                const list62 = new LList({
                  name: email+"62",
                  items: defaultItems[2]
                });
                list62.save();
                  //Recent completed plans (Achievement) | week2
                const listD2 = new LList({
                  name: email+"weeklyDone2",
                  
                });
                listD2.save();



                //creating Lists for week3
                const list13 = new LList({
                  name: email+"13",
                  items: defaultItems[0]
                });
                list13.save();

                const list23 = new LList({
                  name: email+"23",
                  items: defaultItems[1]
                });
                list23.save();

                const list33 = new LList({
                  name: email+"33",
                  items: defaultItems[2]
                });
                list33.save();
                const list43 = new LList({
                  name: email+"43",
                  items: defaultItems[0]
                });
                list43.save();
                const list53 = new LList({
                  name: email+"53",
                  items: defaultItems[1]
                });
                list53.save();
                const list63 = new LList({
                  name: email+"63",
                  items: defaultItems[2]
                });
                list63.save();
                  //Recent completed plans(Achievement) | week3
                const listD3 = new LList({
                  name: email+"weeklyDone3",
                  
                });
                listD3.save();

                  //Gratitude
                  const listA = new LList({
                    name: email+"gratitude",
                    items: defaultGratitude                 
                  });
                  listA.save();

                //Hash Password
                bcrypt.genSalt(10,(err, salt)=>
                    bcrypt.hash(newUser.password, salt,(err, hash)=>{
                        if(err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                        .then(user =>{
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    }))                
            }
        })
    }
});


// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
    
  });

  //Logout Handle
  router.get('/logout',(req,res)=>{
      req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
        
  });

module.exports=router;