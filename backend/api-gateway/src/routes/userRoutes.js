const express = require('express');
const userServiceProxy = require('../proxies/userServiceProxy');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

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
router.get('/', userServiceProxy.getUsers);

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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details
 */
router.get('/:userId', authMiddleware.verifyToken, userServiceProxy.getUser);

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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User updated
 */
router.put('/:userId', authMiddleware.verifyToken, userServiceProxy.updateUser);

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
