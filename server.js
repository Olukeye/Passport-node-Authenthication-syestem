const express  = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const session  = require('express-session');
const expressLayouts = require('express-ejs-layouts');


const app = express();

// config passport
require('./config/passport')(passport);

// Config DB
const db = require('./config/key').MongoURI;

// Connect to Database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('database is connected.'))
.catch(err => console.log(err));
   

// EJS VIEWS
app.use(expressLayouts);
app.set('view engine', 'ejs')

// bodyParser
app.use(express.urlencoded({extended: false}));

// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// passprt
app.use(passport.initialize());
app.use(passport.session());

// connect flash (this will flash a success or error message after sumission)
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})  

// routes
app.use('/',  require('./routes/index'));
app.use('/users',  require('./routes/users'));

// PORT 
const PORT = process.env.PORT || 2021;
app.listen(PORT, console.log(`Passport server running on port ${PORT}`));