const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// Config DB
const db = require('./config/key').MongoURI;

// Connect to Database
mongoose.connect(db, {useNewUrlParser: true })
.then(() => console.log('database is connected.'))
.catch(err => console.log(err));
   

// EJS VIEWS
app.use(expressLayouts);
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}));
// routes
app.use('/',  require('./routes/index'));
app.use('/users',  require('./routes/users'));



const PORT = process.env.PORT || 2021;
app.listen(PORT, console.log(`Passport server running on port ${PORT}`));