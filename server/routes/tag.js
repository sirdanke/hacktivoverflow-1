var express = require('express');
var router = express.Router();
const tagController = require('../controllers/tagController')

router.get('/', tagController.findAll )
// router.post('/', tagController.create)


module.exports = router