const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const chat = require('../controllers/chatController');

router.post('/user/registeration', user.registerUser);
router.post('/user/login', user.loginUser);
router.get('/user/find/:userId', user.findUser);
router.get('/user/getUsers', user.getUsers);

router.post('/', chat.createChat);
router.get('/:userId', chat.findUserChat);
router.get('/find/:firstId/:secondId', chat.findChat);

module.exports = router;