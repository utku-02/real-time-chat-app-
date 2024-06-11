const chatRepository = require('../repositories/chatRepository');
const producer = require('../utils/producer');

exports.createChatRoom = async (chatRoomData) => {
    const chatRoom = await chatRepository.createChatRoom(chatRoomData);
    await producer.sendMessage('chat.room.created', chatRoom);
    return chatRoom;
};

exports.getChatRooms = async () => {
    return await chatRepository.getChatRooms();
};

exports.getChatRoom = async (id) => {
    return await chatRepository.getChatRoom(id);
};

exports.updateChatRoom = async (id, chatRoomData) => {
    const chatRoom = await chatRepository.updateChatRoom(id, chatRoomData);
    await producer.sendMessage('chat.room.updated', chatRoom);
    return chatRoom;
};

exports.deleteChatRoom = async (id) => {
    await chatRepository.deleteChatRoom(id);
    await producer.sendMessage('chat.room.deleted', { id });
};

exports.inviteUsers = async (id, users) => {
    const chatRoom = await chatRepository.inviteUsers(id, users);
    await producer.sendMessage('chat.room.invited', { id, users });
    return chatRoom;
};

exports.handleUserUpdated = async (user) => {
    console.log('User updated:', user);
};

exports.healthCheck = async () => {
  return await chatRepository.healthCheck();
};
