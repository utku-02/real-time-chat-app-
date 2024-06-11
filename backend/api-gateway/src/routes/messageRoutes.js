const express = require('express');
const messageServiceProxy = require('../proxies/messageServiceProxy');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Message sent
 */
router.post('/', authMiddleware.verifyToken, messageServiceProxy.sendMessage);

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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get('/:chatId', authMiddleware.verifyToken, messageServiceProxy.getMessages);

module.exports = router;
