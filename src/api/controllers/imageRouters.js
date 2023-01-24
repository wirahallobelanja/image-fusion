const express = require('express')
const router = express.Router()
const imagesController = require('../controllers/imagesController')

router.get('/generateQr', imagesController.generateQr);

module.exports = router