//External imports
const express = require('express');

//Custom Imports
const controller = require('./socket.io.controller');

let router = express.Router();

router.get('/start', controller.startIoChat);


module.exports = router;