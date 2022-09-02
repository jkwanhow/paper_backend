var mongoose = require('mongoose');
const { map } = require('../app');
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

module.exports = {mainTest,
    modelTest,
}