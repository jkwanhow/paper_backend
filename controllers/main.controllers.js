var mongoose = require('mongoose');
const Test = require('../models/test');
const Receipt = require('../models/receipt');

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');
const initializePassport = require('../scripts/passportScritps');

initializePassport(passport);

const createUser = (req, res) => {
    data = req.body;
    const newUser = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,

    })
    newUser.save(function(error){
        if(error){
            console.log(error);
        }else{
            res.send('user created');
        }
    })
}

const mainTest = (req, res) => {
    res.send("Backend is running and visible on the browser, nice");
};

const modelTest = (req, res) => {
    Test.find( {}, (error, items) => {
        if(error) console.log(error);
        res.send(items);
    });
};

const addTest = (req, res) => {
    data = req.query;
    if (!(('name' in data) && ('age' in data))){
        res.send('input invalid');
        return;
    }
    var holderObj = {name: data.name, age: data.age};
    if ('other_info' in data){
        holderObj['other_info'] = data.other_info;
    }
    var test1 = new Test(holderObj);
    test1.save(function(err, test) {
        if (err) return console.error(err);
        console.log(test.name + " saved info");

    });
    res.send('received request');
};

const getReceipts = (req, res) => {
    Receipt.find( {}, (error, items) => {
        if(error) console.log(error);
        res.send(items);
    });
};

/*
const validateLogin = (req, res) => {
    User.findOne({email: req.body.email}, (error, data) => {
        if(error) console.log(error)
    }).clone().then(function(data){
        if (!data) {
            res.send('user not found');
            return;
        }

        hash = data.password;
        bcrypt.compare(req.body.password, hash, function(error, isMatch){
            if (error) {
                console.log(error);
            } else if(!isMatch){
                res.send('wrong password');
            }else{
                res.send({id:data.id_, email: data.email});
            }
        })
    })


}
*/
const validateLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: false,
});

module.exports = {mainTest,
    modelTest,
    addTest,
    createUser,
    getReceipts,
    validateLogin,
}