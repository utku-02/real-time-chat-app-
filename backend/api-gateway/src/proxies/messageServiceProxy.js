const axios = require('axios');

exports.sendMessage = async (req, res) => {
    try {
        const response = await axios.post('http://message-service:3003/messages', req.body);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.get(`http://message-service:3003/messages/${chatId}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
