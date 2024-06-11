const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');
const messageRoutes = require('./messageRoutes');
const { swaggerUi, specs } = require('../swagger');
const router = express.Router();

// Swagger setup
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/chats', chatRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
