const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controllers');

router.put('/user', mainController.createUser);

router.post('/validate', mainController.validateLogin);

router.get('/', mainController.mainTest);

router.get('/test', checkAuthenticated, mainController.modelTest);

router.post('/test', mainController.addTest);

router.get('/receipts', mainController.getReceipts);


function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.send('not authenticated');
}

module.exports = router;