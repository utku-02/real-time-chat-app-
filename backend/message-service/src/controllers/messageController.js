const messageService = require('../services/messageService');
const amqp = require('amqplib');
const fetch = require('cross-fetch');
global.fetch = global.fetch || fetch;

exports.createMessage = async (req, res) => {
    try {
        const message = await messageService.createMessage(req.body);
        res.status(201).json(message);
    } catch (err) {
        console.error('Error in createMessage:', err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.getMessage = async (req, res) => {
    try {
        const message = await messageService.getMessage(req.params.id);
        res.status(200).json(message);
    } catch (err) {
        console.error('Error in getMessage:', err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.getMessagesByChatId = async (req, res) => {
    try {
        const messages = await messageService.getMessagesByChatId(req.params.chatId);
        res.status(200).json(messages);
    } catch (err) {
        console.error('Error in getMessagesByChatId:', err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.getHealthz = async (req, res) => {
    res.status(200).send('OK');
};

exports.getReadiness = async (req, res) => {
    try {
        console.log('Checking GraphQL service readiness...');
        await messageService.healthCheck();
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
