const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// models
const User = require('../model/User');


module.exports = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            // Match user (find email that matches the email)
             User.findOne({email: email})
             .then(user => {
                 if(!user) {
                     return done(null, false, { message: "Invalid email or passord"});
                 }
                   
                //  Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) {
                        return err;
                    }
                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "password incorrect"})
                    }
                });
             })
             .catch((err) => {
                 console.log(err)
             })
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user);
      });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}