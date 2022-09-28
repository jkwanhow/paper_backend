const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const User = require('../models/user');

function initialize(passport) {
    var user;
    const authenticateUser = async (email, password, done) => {
        User.findOne({email: email}, (error, data) => {
            user = data;
            if(error) console.log(error)
        }).clone().then(function(data){
            if (!data) {
                console.log('cannot find user');
                return done(null, false, {message:'No such username found'});
            }
            
            hash = data.password;
            bcrypt.compare(password, hash, function(error, isMatch){
                if (error) {
                    console.log(error);
                    return done(e);
                } else if(!isMatch){
                    console.log('incorrect password')
                    return done(null, false, {message: 'password incorrect'});
                }else{
                    console.log('in');
                    return done(null, data);
                }
            });
        });
    }
    
    
    
    passport.use(new LocalStrategy({usernameField:'email', passwordField:'password'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.email));
    passport.deserializeUser(function(email, done){
        //console.log(`---${JSON.stringify(email)}---`);
        User.findOne({email: email}, (error, data) => {
            if(error) console.log(error)
            return done(error, data)
        })
    });
}

module.exports = initialize;