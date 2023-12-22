const express = require('express');
const user = require('../controllers/userController');
const router = express.Router();

router.post('/user/registeration', user.registerUser);
router.post('/user/login', user.loginUser);
router.get('/user/find/:userId', user.findUser);
router.get('/user/getUsers', user.getUsers);

module.exports = router;