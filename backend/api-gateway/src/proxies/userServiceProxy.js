const axios = require('axios');

exports.getUsers = async (req, res) => {
    try {
        const response = await axios.get('http://user-service:3001/users');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await axios.get(`http://user-service:3001/users/${userId}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await axios.put(`http://user-service:3001/users/${userId}`, req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const response = await axios.get('http://user-service:3001/profile');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const response = await axios.put('http://user-service:3001/profile', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSettings = async (req, res) => {
    try {
        const response = await axios.get('http://user-service:3001/settings');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const response = await axios.put('http://user-service:3001/settings', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
