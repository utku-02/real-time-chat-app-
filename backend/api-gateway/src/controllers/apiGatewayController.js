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

exports.handleForgotPassword = async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:3004/auth/forgot-password', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleResetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const response = await axios.post(`http://auth-service:3004/auth/reset-password/${token}`, req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleGetUsers = async (req, res) => {
    try {
        const response = await axios.get('http://user-service:3001/users');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleGetUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await axios.get(`http://user-service:3001/users/${userId}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleUpdateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await axios.put(`http://user-service:3001/users/${userId}`, req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleGetChats = async (req, res) => {
    try {
        const response = await axios.get('http://chat-service:3002/chats');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleGetChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.get(`http://chat-service:3002/chats/${chatId}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleUpdateChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.put(`http://chat-service:3002/chats/${chatId}`, req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleDeleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.delete(`http://chat-service:3002/chats/${chatId}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleInviteUsers = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.post(`http://chat-service:3002/chats/${chatId}/invite`, req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleGetMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.get(`http://message-service:3003/messages/${chatId}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleGetProfile = async (req, res) => {
    try {
        const response = await axios.get('http://user-service:3001/profile');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleUpdateProfile = async (req, res) => {
    try {
        const response = await axios.put('http://user-service:3001/profile', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleGetSettings = async (req, res) => {
    try {
        const response = await axios.get('http://user-service:3001/settings');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleUpdateSettings = async (req, res) => {
    try {
        const response = await axios.put('http://user-service:3001/settings', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
