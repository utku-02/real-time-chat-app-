const userService = require('../services/userService');
const amqp = require('amqplib');
const fetch = require('cross-fetch');

global.fetch = global.fetch || fetch;

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserSettings = async (req, res) => {
    try {
        const settings = await userService.getUserSettings(req.params.id);
        res.status(200).json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserSettings = async (req, res) => {
    try {
        const settings = await userService.updateUserSettings(req.params.id, req.body);
        res.status(200).json(settings);
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
        await userService.healthCheck();
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
