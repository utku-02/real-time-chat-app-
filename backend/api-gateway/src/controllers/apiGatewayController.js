const axios = require('axios');

exports.handleMessage = async (req, res) => {
    try {
        const response = await axios.post('http://message-service:3003/messages', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleChat = async (req, res) => {
    try {
        const response = await axios.post('http://chat-service:3002/chats', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleUser = async (req, res) => {
    try {
        const response = await axios.post('http://user-service:3001/users', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleAuthRegister = async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:3004/auth/register', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleAuthLogin = async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:3004/auth/login', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
