const authService = require('../services/authService');

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
