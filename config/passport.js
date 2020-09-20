const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/users');

module.exports = (passport) => {
    
    //LocalStrategy

    passport.use(new LocalStrategy((username, password, done) => {

        //Match User
        let query = {username: username};
        User.findOne(query, (err, user) => {
            if (err) throw err;

            if (!user) {
                console.log('No User Found!');
                return done(null, false, {message: 'No User Found!'});
            }

            //Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if(isMatch){
                    res.status(200).json(user)
                    // return done(null, user);
                } else{
                    console.log(err)
                    return done(null, false, {message: 'Incorrect Password!'});
                }
            });
        });

    }));
    
    //Serialize & Deserialize User
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
} 