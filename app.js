//NPM
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');//Simple, unobtrusive authentication for Node.js.
const bodyParser = require('body-parser');




const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

//Folder Public
app.use('/', express.static("public"));

//Passport config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI; 

// Connect to Mongo
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false})
    .then(()=>console.log('MongoDB Connected...'))
    .catch (err=> console.log(err));
   
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//BodyParser
app.use(express.urlencoded({extended: false}));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error= req.flash('error');
  next();
});

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/users', express.static("public"));

//404 error
app.use(function(req,res,next){
  res.status(404).render('404',{
    isError: true
  });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on port 5000'));