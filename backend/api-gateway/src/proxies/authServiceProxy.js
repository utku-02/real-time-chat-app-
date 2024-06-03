const axios = require('axios');

exports.login = async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:3004/auth/login', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:3004/auth/register', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:3004/auth/forgot-password', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const response = await axios.post(`http://auth-service:3004/auth/reset-password/${token}`, req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
