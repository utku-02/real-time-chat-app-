const messageRepository = require('../repositories/messageRepository');
const producer = require('../utils/producer');

exports.createMessage = async (messageData) => {
    const message = await messageRepository.createMessage(messageData);
    await producer.sendMessage('message.sent', message);
    return message;
};

exports.getMessage = async (id) => {
    return await messageRepository.getMessage(id);
};

exports.handleChatRoomJoined = async (chatRoom) => {
    console.log('Chat room joined:', chatRoom);
};
