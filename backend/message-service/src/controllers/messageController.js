const messageService = require('../services/messageService');

exports.createMessage = async (req, res) => {
    try {
        const message = await messageService.createMessage(req.body);
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessage = async (req, res) => {
    try {
        const message = await messageService.getMessage(req.params.id);
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessagesByChatId = async (req, res) => {
    try {
        const messages = await messageService.getMessagesByChatId(req.params.chatId);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
