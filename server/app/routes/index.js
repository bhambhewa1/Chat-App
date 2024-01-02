const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const chat = require('../controllers/chatController');
const message = require('../controllers/messageController');

router.post('/user/registeration', user.registerUser);
router.post('/user/login', user.loginUser);
router.get('/user/find/:userId', user.findUser);    // used to get a particular user for getting messages
router.get('/user/getUsers', user.getUsers);      // used to create chatting with each user and showing all users on top of screen in UI

router.post('/chat/create', chat.createChat);  // used to create chat between one of them user(which are on top of screen in UI)
router.get('/chat/:userId', chat.findUserChat);  // used to get users who are already chatted with logged in user.
router.get('/chat/find/:firstId/:secondId', chat.findChat); 

router.post('/message', message.createMessage);  // used to sended messsages to save for that another chatter
router.get('/message/:chatId', message.getMessages);  // get messages of particular chatted person with logged in user. 

module.exports = router;