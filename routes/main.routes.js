const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controllers');

router.get('/', mainController.mainTest);

router.get('/test', mainController.modelTest);

router.post('/test', mainController.addTest);

module.exports = router;