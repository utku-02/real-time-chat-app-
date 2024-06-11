const chatService = require('../services/chatService');
const amqp = require('amqplib');
const fetch = require('cross-fetch');

global.fetch = global.fetch || fetch;

exports.createChatRoom = async (req, res) => {
    try {
        const chatRoom = await chatService.createChatRoom(req.body);
        res.status(201).json(chatRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getChatRooms = async (req, res) => {
    try {
        const chatRooms = await chatService.getChatRooms();
        res.status(200).json(chatRooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getChatRoom = async (req, res) => {
    try {
        const chatRoom = await chatService.getChatRoom(req.params.id);
        res.status(200).json(chatRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateChatRoom = async (req, res) => {
    try {
        const chatRoom = await chatService.updateChatRoom(req.params.id, req.body);
        res.status(200).json(chatRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteChatRoom = async (req, res) => {
    try {
        await chatService.deleteChatRoom(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.inviteUsers = async (req, res) => {
    try {
        const chatRoom = await chatService.inviteUsers(req.params.id, req.body.users);
        res.status(200).json(chatRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getHealthz = async (req, res) => {
    res.status(200).send('OK');
};

exports.getReadiness = async (req, res) => {
    try {
        console.log('Checking GraphQL service readiness...');
        await chatService.healthCheck();
        console.log('GraphQL service is ready.');
    } catch (err) {
        console.error('GraphQL service not ready:', err.message);
        return res.status(503).send('GraphQL service not ready: ' + err.message);
    }
    try {
        console.log('Checking RabbitMQ readiness...');
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        await connection.close();
        console.log('RabbitMQ is ready.');
    } catch (err) {
        console.error('RabbitMQ not ready:', err.message);
        return res.status(503).send('RabbitMQ not ready: ' + err.message);
    }
    res.status(200).send('OK');
};
