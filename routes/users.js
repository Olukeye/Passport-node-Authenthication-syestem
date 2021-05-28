const express = require('express');
const router = express.Router();
const User = require('../model/User');  // import the User model
const bcript = require('bcryptjs');
const passport = require('passport');


// login page
router.get('/login', (req, res) => {
    res.render('login')
});

// resgister page
router.get('/register',async (req, res) => await res.render('register'));

// Handle Register
router.post('/register', async(req, res) => {
   const {name, email, password, password2 } = req.body;
   let errors = [];
    
    //    Check if all input fields are entered
    if(!name || !email || !password || !password2) {
        errors.push({ message: "Please all fields are required"});
    }

    // check if password match
    if(password !== password2) {
        errors.push({message: "Password do not match!"});
    }

    // check if length of password is < 6, else alert
    if(password.length < 6) {
        errors.push({message: "Password should be atleast 6 characters!"})
    }

    // re-render the registration form if error meets any of the above issues
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation check
        User.findOne({email: email}) 
        .then(user => {
            if(user) {
                // if the email already existed, remain still in the register page
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
                // alert
                errors.push({message: "Email already existed, please re-confirm!"})
            } else {
                // create a new user
                const newUser = new User({
                    name,
                    email,
                    password
                });
                // Hash Password
                bcript.genSalt(10, (err, salt) => {
                    bcript.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // Set plain password to hash
                        newUser.password = hash;
                        // Save User
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You have registered successfully, please login')
                            res.redirect('/login');
                        })
                        .catch(err => console.log(err));
                    })
                })
            }
        });
    }
});

// login router   
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/landingpage',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle 
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})


module.exports = router; 