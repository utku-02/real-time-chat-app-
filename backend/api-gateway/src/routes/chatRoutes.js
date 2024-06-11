const express = require('express');
const chatServiceProxy = require('../proxies/chatServiceProxy');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Chat created
 */
router.post('/', authMiddleware.verifyToken, chatServiceProxy.createChat);

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get all chats
 *     tags: [Chats]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of chats
 */
router.get('/', authMiddleware.verifyToken, chatServiceProxy.getChats);

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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Chat details
 */
router.get('/:chatId', authMiddleware.verifyToken, chatServiceProxy.getChat);

module.exports = router;
