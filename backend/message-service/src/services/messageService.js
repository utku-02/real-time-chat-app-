const messageRepository = require('../repositories/messageRepository');
const producer = require('../utils/producer');

exports.createMessage = async (messageData) => {
    messageData.timestamp = new Date();
    
    const message = await messageRepository.createMessage(messageData);
    await producer.sendMessage('message.sent', message);
    return message;
};

exports.getMessage = async (id) => {
    return await messageRepository.getMessage(id);
};

exports.getMessagesByChatId = async (chatId) => {
    return await messageRepository.getMessagesByChatId(chatId);
};

exports.handleChatRoomJoined = async (chatRoom) => {
    console.log('Chat room joined:', chatRoom);
};

exports.healthCheck = async () => {
    return await messageRepository.healthCheck();
};
