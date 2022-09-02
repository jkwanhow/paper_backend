var mongoose = require('mongoose');
const Test = require('../models/test');

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
    res.send('recieved request');
}

module.exports = {mainTest,
    modelTest,
    addTest,
}