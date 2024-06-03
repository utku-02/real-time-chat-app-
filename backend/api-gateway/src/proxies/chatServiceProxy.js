const axios = require('axios');

exports.createChat = async (req, res) => {
    try {
        const response = await axios.post('http://chat-service:3002/chats', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getChats = async (req, res) => {
    try {
        const response = await axios.get('http://chat-service:3002/chats');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.get(`http://chat-service:3002/chats/${chatId}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.put(`http://chat-service:3002/chats/${chatId}`, req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.delete(`http://chat-service:3002/chats/${chatId}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.inviteUsers = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.post(`http://chat-service:3002/chats/${chatId}/invite`, req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
