const express = require('express');
const apiGatewayController = require('../controllers/apiGatewayController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/messages', authMiddleware.verifyToken, apiGatewayController.handleMessage);
router.post('/chats', authMiddleware.verifyToken, apiGatewayController.handleChat);
router.post('/users', authMiddleware.verifyToken, apiGatewayController.handleUser);
router.post('/auth/register', apiGatewayController.handleAuthRegister);
router.post('/auth/login', apiGatewayController.handleAuthLogin);

module.exports = router;
