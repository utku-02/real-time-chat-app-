const express = require('express');
const authServiceProxy = require('../proxies/authServiceProxy');
const chatServiceProxy = require('../proxies/chatServiceProxy');
const messageServiceProxy = require('../proxies/messageServiceProxy');
const userServiceProxy = require('../proxies/userServiceProxy');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
router.post('/auth/login', authServiceProxy.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Server error
 */
router.post('/auth/register', authServiceProxy.register);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       500:
 *         description: Server error
 */
router.post('/auth/forgot-password', authServiceProxy.forgotPassword);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       500:
 *         description: Server error
 */
router.post('/auth/reset-password/:token', authServiceProxy.resetPassword);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Server error
 */
router.get('/users', authMiddleware.verifyToken, userServiceProxy.getUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       500:
 *         description: Server error
 */
router.get('/users/:userId', authMiddleware.verifyToken, userServiceProxy.getUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Server error
 */
router.put('/users/:userId', authMiddleware.verifyToken, userServiceProxy.updateUser);

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Chat management routes
 */

/**
 * @swagger
 * /chats:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Chat created successfully
 *       500:
 *         description: Server error
 */
router.post('/chats', authMiddleware.verifyToken, chatServiceProxy.createChat);

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get all chats
 *     tags: [Chats]
 *     responses:
 *       200:
 *         description: List of all chats
 *       500:
 *         description: Server error
 */
router.get('/chats', authMiddleware.verifyToken, chatServiceProxy.getChats);

/**
 * @swagger
 * /chats/{chatId}:
 *   get:
 *     summary: Get chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat details
 *       500:
 *         description: Server error
 */
router.get('/chats/:chatId', authMiddleware.verifyToken, chatServiceProxy.getChat);

/**
 * @swagger
 * /chats/{chatId}:
 *   put:
 *     summary: Update chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: Chat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chat updated successfully
 *       500:
 *         description: Server error
 */
router.put('/chats/:chatId', authMiddleware.verifyToken, chatServiceProxy.updateChat);

/**
 * @swagger
 * /chats/{chatId}:
 *   delete:
 *     summary: Delete chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/chats/:chatId', authMiddleware.verifyToken, chatServiceProxy.deleteChat);

/**
 * @swagger
 * /chats/{chatId}/invite:
 *   post:
 *     summary: Invite users to chat
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: Chat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Users invited successfully
 *       500:
 *         description: Server error
 */
router.post('/chats/:chatId/invite', authMiddleware.verifyToken, chatServiceProxy.inviteUsers);

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management routes
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               chatId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: Server error
 */
router.post('/messages', authMiddleware.verifyToken, messageServiceProxy.sendMessage);

/**
 * @swagger
 * /messages/{chatId}:
 *   get:
 *     summary: Get messages by chat ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: List of messages for the specified chat
 *       500:
 *         description: Server error
 */
router.get('/messages/:chatId', authMiddleware.verifyToken, messageServiceProxy.getMessages);

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management routes
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: User profile details
 *       500:
 *         description: Server error
 */
router.get('/profile', authMiddleware.verifyToken, userServiceProxy.getProfile);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       500:
 *         description: Server error
 */
router.put('/profile', authMiddleware.verifyToken, userServiceProxy.updateProfile);

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: User settings management routes
 */

/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get user settings
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: User settings details
 *       500:
 *         description: Server error
 */
router.get('/settings', authMiddleware.verifyToken, userServiceProxy.getSettings);

/**
 * @swagger
 * /settings:
 *   put:
 *     summary: Update user settings
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               settings:
 *                 type: object
 *     responses:
 *       200:
 *         description: User settings updated successfully
 *       500:
 *         description: Server error
 */
router.put('/settings', authMiddleware.verifyToken, userServiceProxy.updateSettings);

module.exports = router;
