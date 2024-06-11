const axios = require('axios');

exports.sendMessage = async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const userResponse = await axios.get(`http://user-service:3001/users/${userId}`);
        const user = userResponse.data;

        const messageData = {
            ...req.body,
            senderId: user.id
        };

        const response = await axios.post('http://message-service:3003/messages', messageData);
        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error in sendMessage:', err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.getMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`http://message-service:3003/messages/${id}`);
        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error in getMessage:', err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.getMessagesByChatId = async (req, res) => {
    try {
        const { chatId } = req.params;
        const response = await axios.get(`http://message-service:3003/messages/chat/${chatId}`);
        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error in getMessagesByChatId:', err.message);
        res.status(500).json({ error: err.message });
    }
};
