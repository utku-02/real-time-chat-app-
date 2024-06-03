const express = require('express');
const authServiceProxy = require('../proxies/authServiceProxy');
const chatServiceProxy = require('../proxies/chatServiceProxy');
const messageServiceProxy = require('../proxies/messageServiceProxy');
const userServiceProxy = require('../proxies/userServiceProxy');
const authMiddleware = require('../middleware/authMiddleware');
const { swaggerUi, specs } = require('../swagger');

const router = express.Router();

// Swagger setup
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Auth routes
router.post('/auth/login', authServiceProxy.login);
router.post('/auth/register', authServiceProxy.register);
router.post('/auth/forgot-password', authServiceProxy.forgotPassword);
router.post('/auth/reset-password/:token', authServiceProxy.resetPassword);

// User routes
router.get('/users', authMiddleware.verifyToken, userServiceProxy.getUsers);
router.get('/users/:userId', authMiddleware.verifyToken, userServiceProxy.getUser);
router.put('/users/:userId', authMiddleware.verifyToken, userServiceProxy.updateUser);

// Chat routes
router.post('/chats', authMiddleware.verifyToken, chatServiceProxy.createChat);
router.get('/chats', authMiddleware.verifyToken, chatServiceProxy.getChats);
router.get('/chats/:chatId', authMiddleware.verifyToken, chatServiceProxy.getChat);
router.put('/chats/:chatId', authMiddleware.verifyToken, chatServiceProxy.updateChat);
router.delete('/chats/:chatId', authMiddleware.verifyToken, chatServiceProxy.deleteChat);
router.post('/chats/:chatId/invite', authMiddleware.verifyToken, chatServiceProxy.inviteUsers);

// Message routes
router.post('/messages', authMiddleware.verifyToken, messageServiceProxy.sendMessage);
router.get('/messages/:chatId', authMiddleware.verifyToken, messageServiceProxy.getMessages);

// Profile routes
router.get('/profile', authMiddleware.verifyToken, userServiceProxy.getProfile);
router.put('/profile', authMiddleware.verifyToken, userServiceProxy.updateProfile);

// Settings routes
router.get('/settings', authMiddleware.verifyToken, userServiceProxy.getSettings);
router.put('/settings', authMiddleware.verifyToken, userServiceProxy.updateSettings);

module.exports = router;
