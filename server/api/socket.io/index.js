//External imports
const express = require('express');

//Custom Imports
const controller = require('./socket.io.controller');
const { upload } =require('../../middlewares/multer');

let router = express.Router();

router.get('/start', controller.startIoChat);

router.get('/upload_image_view', controller.uploadImageView);

router.post('/upload_image', upload.single('img_url'),  controller.uploadImage);
//upload.single('img_url'),
module.exports = router;