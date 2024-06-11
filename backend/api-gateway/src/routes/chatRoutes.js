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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Chat updated
 */
router.put('/:chatId', authMiddleware.verifyToken, chatServiceProxy.updateChat);

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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Chat deleted
 */
router.delete('/:chatId', authMiddleware.verifyToken, chatServiceProxy.deleteChat);

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
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users invited
 */
router.post('/:chatId/invite', authMiddleware.verifyToken, chatServiceProxy.inviteUsers);

module.exports = router;
