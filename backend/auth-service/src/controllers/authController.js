const authService = require('../services/authService');
const amqp = require('amqplib');
const fetch = require('cross-fetch');

global.fetch = global.fetch || fetch;

exports.registerUser = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const token = await authService.loginUser(req.body);
        res.status(200).json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        await authService.forgotPassword(req.body.email);
        res.status(200).json({ message: 'Password reset link sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        await authService.resetPassword(req.params.token, req.body.password);
        res.status(200).json({ message: 'Password has been reset' });
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
        await authService.healthCheck();
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
