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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
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
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful registration
 */
router.post('/auth/register', authServiceProxy.register);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
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
 *         description: Password reset email sent
 */
router.post('/auth/forgot-password', authServiceProxy.forgotPassword);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Password reset successful
 */
router.post('/auth/reset-password/:token', authServiceProxy.resetPassword);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', authMiddleware.verifyToken, userServiceProxy.getUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 */
router.get('/users/:userId', authMiddleware.verifyToken, userServiceProxy.getUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
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
 *         description: User updated
 */
router.put('/users/:userId', authMiddleware.verifyToken, userServiceProxy.updateUser);

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Chat management endpoints
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
 *     responses:
 *       200:
 *         description: Chat created
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
 *         description: List of chats
 */
router.get('/chats', authMiddleware.verifyToken, chatServiceProxy.getChats);

/**
 * @swagger
 * /chats/{chatId}:
 *   get:
 *     summary: Get a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat details
 */
router.get('/chats/:chatId', authMiddleware.verifyToken, chatServiceProxy.getChat);

/**
 * @swagger
 * /chats/{chatId}:
 *   put:
 *     summary: Update a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Chat updated
 */
router.put('/chats/:chatId', authMiddleware.verifyToken, chatServiceProxy.updateChat);

/**
 * @swagger
 * /chats/{chatId}:
 *   delete:
 *     summary: Delete a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat deleted
 */
router.delete('/chats/:chatId', authMiddleware.verifyToken, chatServiceProxy.deleteChat);

/**
 * @swagger
 * /chats/{chatId}/invite:
 *   post:
 *     summary: Invite users to a chat
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Users invited
 */
router.post('/chats/:chatId/invite', authMiddleware.verifyToken, chatServiceProxy.inviteUsers);

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management endpoints
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
 *               chatId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent
 */
router.post('/messages', authMiddleware.verifyToken, messageServiceProxy.sendMessage);

/**
 * @swagger
 * /messages/{chatId}:
 *   get:
 *     summary: Get messages for a chat
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get('/messages/:chatId', authMiddleware.verifyToken, messageServiceProxy.getMessages);

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile endpoints
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: User profile
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
 *         description: User profile updated
 */
router.put('/profile', authMiddleware.verifyToken, userServiceProxy.updateProfile);

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: User settings endpoints
 */

/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get user settings
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: User settings
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
 *               notifications:
 *                 type: boolean
 *               privacy:
 *                 type: string
 *               theme:
 *                 type: string
 *     responses:
 *       200:
 *         description: User settings updated
 */
router.put('/settings', authMiddleware.verifyToken, userServiceProxy.updateSettings);

module.exports = router;
