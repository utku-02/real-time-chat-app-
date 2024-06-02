const chatRepository = require('../repositories/chatRepository');
const producer = require('../utils/producer');

exports.createChatRoom = async (chatRoomData) => {
    const chatRoom = await chatRepository.createChatRoom(chatRoomData);
    await producer.sendMessage('chat.room.created', chatRoom);
    return chatRoom;
};

exports.getChatRoom = async (id) => {
    return await chatRepository.getChatRoom(id);
};

exports.handleUserUpdated = async (user) => {
    console.log('User updated:', user);
};
