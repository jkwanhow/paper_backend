const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controllers');
const receiptController = require('../controllers/receipt.controllers');
const userController = require('../controllers/user.controllers');

router.put('/user', mainController.createUser);

router.post('/validate', mainController.validateLogin);

router.get('/', mainController.mainTest);

router.get('/test', checkAuthenticated, mainController.modelTest);

router.post('/test',checkAuthenticated, mainController.addTest);

router.get('/receipts', checkAuthenticated, receiptController.getReceipts);

router.post('/receipts', checkAuthenticated, receiptController.createReceipt);

router.get('/stats', userController.getStatistics);


function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.send('not authenticated');
}

module.exports = router;