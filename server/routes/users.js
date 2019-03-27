var express = require('express');
var router = express.Router();
const userController = require('../controllers/usersController')
const access = require('../middlewares/access')
const cekUniqueTag = require('../middlewares/checkUniqueTag')

/* GET users listing. */
router.get('/tag', access, userController.getUserTag)

router.post('/', cekUniqueTag, userController.create)

router.patch('/updateTag',access, cekUniqueTag, userController.updateTag)

router.post('/login', userController.login)

module.exports = router;
