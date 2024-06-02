const chatService = require('../services/chatService');

exports.createChatRoom = async (req, res) => {
    try {
        const chatRoom = await chatService.createChatRoom(req.body);
        res.status(201).json(chatRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getChatRoom = async (req, res) => {
    try {
        const chatRoom = await chatService.getChatRoom(req.params.id);
        res.status(200).json(chatRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
