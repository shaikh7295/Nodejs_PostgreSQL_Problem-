const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controller/upload.controller');


router.post('/upload', uploadFile);


module.exports = router;