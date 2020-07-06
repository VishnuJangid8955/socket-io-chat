// Internal Imports
const fs = require('fs');
const util = require('util');
const path = require('path');

// External Imports
const multer = require('multer');

// Custom Imports
const config = require("../configuration");

exports.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, config.get('multer.uploadDirectoryPath'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
})
