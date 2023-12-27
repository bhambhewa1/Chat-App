const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const chat = require('../controllers/chatController');
const message = require('../controllers/messageController');

router.post('/user/registeration', user.registerUser);
router.post('/user/login', user.loginUser);
router.get('/user/find/:userId', user.findUser);
router.get('/user/getUsers', user.getUsers);

router.post('/chat/create', chat.createChat);
router.get('/chat/:userId', chat.findUserChat);
router.get('/chat/find/:firstId/:secondId', chat.findChat);

router.post('/message', message.createMessage);
router.get('/message/:chatId', message.getMessages);

module.exports = router;