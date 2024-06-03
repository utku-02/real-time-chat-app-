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

exports.updateChatRoom = async (req, res) => {
    try {
        const chatRoom = await chatService.updateChatRoom(req.params.id, req.body);
        res.status(200).json(chatRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteChatRoom = async (req, res) => {
    try {
        await chatService.deleteChatRoom(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.inviteUsers = async (req, res) => {
    try {
        const chatRoom = await chatService.inviteUsers(req.params.id, req.body.users);
        res.status(200).json(chatRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
